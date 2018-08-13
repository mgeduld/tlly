import test from 'ava'
import { getDBDouble } from '../test-fixtures'
import { ErrorMessage } from '../enums/error-message'
import {
  talliesReducer,
  getTotal,
  getContiguousResponseValue,
  normalizeContiguousTallies,
  seinfeldCount,
  seinfeldCountFactory
} from './seinfeld-count'

test('queries::seinfeld-count::talliesReducer', (t) => {
  const contiguousTallies = {
    foo: { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' },
    bar: { count: 9, last: new Date().toUTCString() }
  }
  const actual = talliesReducer(contiguousTallies)([], 'bar')
  const expected = ['bar: 9']
  t.deepEqual(actual, expected)
})

test('queries::seinfeld-count::talliesReducer resets count due to time gap', (t) => {
  const contiguousTallies = {
    foo: { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' },
    bar: { count: 9, last: new Date().toUTCString() }
  }
  const actual = talliesReducer(contiguousTallies)([], 'foo')
  const expected = ['foo: 0']
  t.deepEqual(actual, expected)
})

test('queries::seinfeld-count::getTotal', (t) => {
  const contiguousTallies = {
    foo: { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' },
    bar: { count: 9, last: new Date().toUTCString() }
  }
  const actual = getTotal(contiguousTallies)
  const expected = 'foo: 0\nbar: 9'
  t.is(actual, expected)
})

test('queries::seinfeld-count::getContiguousResponseValue returns an object when not passed a tally name', (t) => {
  const dbResponse = {
    foo: { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' },
    bar: { count: 9, last: new Date().toUTCString() }
  }
  const dbDouble = getDBDouble([dbResponse])
  t.is(getContiguousResponseValue(dbDouble.db), dbResponse)
})

test('queries::count::normalizeTallies returns its first param if no second param', (t) => {
  t.deepEqual(
    normalizeContiguousTallies({
      t1: { count: 1, last: '' },
      t2: { count: 1, last: '' }
    }),
    {
      t1: { count: 1, last: '' },
      t2: { count: 1, last: '' }
    }
  )
})

test('queries::count::normalizeTallies returns its first param wrapped if ther is a second param', (t) => {
  t.deepEqual(normalizeContiguousTallies({ count: 1, last: '' }, 't1'), {
    t1: { count: 1, last: '' }
  })
})

test('queries::seinfeld-count::seinfeldCount returns a string if tally name specified exists in response', (t) => {
  const response = { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' }
  const dbDouble = getDBDouble([response])
  t.deepEqual(seinfeldCount(dbDouble.db)('foo'), 'foo: 0')
})

test('queries::seinfeld-count::seinfeldCount returns a string if no tally name specified', (t) => {
  const response = {
    foo: { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' },
    bar: { count: 9, last: new Date().toUTCString() }
  }
  const dbDouble = getDBDouble([response])
  t.deepEqual(seinfeldCount(dbDouble.db)(), 'foo: 0\nbar: 9')
})

test('queries::seinfeld-count::seinfeldCount throws an error if no response', (t) => {
  const dbDouble = getDBDouble()
  const error = t.throws(() => seinfeldCount(dbDouble.db)('baz'))
  t.is(error.message, ErrorMessage.noTalliesFound)
})

test('queries::seinfeld-count::seinfeldCountFactory returns a function', (t) => {
  const response = {
    foo: { count: 9, last: 'Sun, 10 Aug 2018 17:49:30 GMT' },
    bar: { count: 9, last: new Date().toUTCString() }
  }
  const dbDouble = getDBDouble([response])
  t.is(seinfeldCountFactory(dbDouble.db)(), 'foo: 0\nbar: 9')
})
