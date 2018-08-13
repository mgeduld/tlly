import test from 'ava'
import { getDBDouble } from '../test-fixtures'
import { ITallies } from '../interfaces/tallies'
import { ErrorMessage } from '../enums/error-message'
import {
  tallyMap,
  talliesReducer,
  getList,
  timestamp,
  timestampFactory
} from './timestamp'

test('queries::timestamp::tallyMap', (t) => {
  t.is(
    tallyMap('foo')({ amount: 1, timeStamp: 'some timestamp' }),
    'foo: 1 (some timestamp)'
  )
})

test('queries::timestamp::talliesReducer', (t) => {
  const tallies: ITallies = {
    foo: [{ amount: 1, timeStamp: 'ts 1' }, { amount: 1, timeStamp: 'ts 2' }],
    bar: [{ amount: 1, timeStamp: 'ts 3' }]
  }
  const actual = talliesReducer(tallies)([], 'foo')
  const expected = ['foo: 1 (ts 1)\nfoo: 1 (ts 2)']
  t.deepEqual(actual, expected)
})

test('queries::timestamp::getList', (t) => {
  const tallies: ITallies = {
    foo: [{ amount: 1, timeStamp: 'ts 1' }, { amount: 1, timeStamp: 'ts 2' }],
    bar: [{ amount: 1, timeStamp: 'ts 3' }]
  }
  const actual = getList(tallies)
  const expected = 'foo: 1 (ts 1)\nfoo: 1 (ts 2)\n\nbar: 1 (ts 3)'
  t.is(actual, expected)
})

test('queries::timestamp::timestamp returns a string built from multiple tallies', (t) => {
  const tallies: ITallies = {
    foo: [{ amount: 1, timeStamp: 'ts 1' }, { amount: 1, timeStamp: 'ts 2' }],
    bar: [{ amount: 1, timeStamp: 'ts 3' }]
  }
  const dbDouble = getDBDouble([tallies])
  const actual = timestamp(dbDouble.db)()
  const expected = 'foo: 1 (ts 1)\nfoo: 1 (ts 2)\n\nbar: 1 (ts 3)'
  t.is(actual, expected)
})

test('queries::timestamp::timestamp returns a string built from a singke tally', (t) => {
  const tallies: ITallies = {
    foo: [{ amount: 1, timeStamp: 'ts 1' }, { amount: 1, timeStamp: 'ts 2' }],
    bar: [{ amount: 1, timeStamp: 'ts 3' }]
  }
  const dbDouble = getDBDouble([tallies.foo])
  const actual = timestamp(dbDouble.db)('foo')
  const expected = 'foo: 1 (ts 1)\nfoo: 1 (ts 2)'
  t.is(actual, expected)
})

test('queries::timestamp::timestamp throws an error when query returns no values', (t) => {
  const dbDouble = getDBDouble()
  const error = t.throws(() => {
    timestamp(dbDouble.db)('foo')
  })
  t.is(error.message, ErrorMessage.noTalliesFound)
})

test('queries::timestamp::timestampFactory', (t) => {
  const dbDouble = getDBDouble()
  t.is(typeof timestampFactory(dbDouble.db), 'function')
})
