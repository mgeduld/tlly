import test from 'ava'
import { getDBDouble } from '../test-fixtures'
import { ErrorMessage } from '../enums/error-message'
import {
  tallyReducer,
  talliesReducer,
  getTotal,
  count,
  countFactory
} from './count'

test('queries::count::tallyReducer', (t) => {
  t.is(tallyReducer(10, { amount: 4, timeStamp: 'some timestamp' }), 14)
})

test('queries::count::talliesReducer', (t) => {
  const tallies = {
    tally1: [
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' }
    ],
    tally2: [{ amount: 1, timeStamp: '' }]
  }
  t.deepEqual(talliesReducer(tallies)(['some text'], 'tally1'), [
    'some text',
    'tally1: 3'
  ])
})

test('queries::count::getTotal', (t) => {
  const tallies = {
    tally1: [
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' }
    ],
    tally2: [{ amount: 1, timeStamp: '' }]
  }
  t.is(getTotal(tallies), 'tally1: 3\ntally2: 1')
})

test('queries::count::count returns a string if tally name specified exists in response', (t) => {
  const response = [
    { amount: 1, timeStamp: '' },
    { amount: 1, timeStamp: '' },
    { amount: 1, timeStamp: '' }
  ]
  const dbDouble = getDBDouble([response])
  t.deepEqual(count(dbDouble.db)('tally1'), 'tally1: 3')
})

test('queries::count::count returns a string if no tally name specified', (t) => {
  const response = {
    tally1: [
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' }
    ],
    tally2: [{ amount: 1, timeStamp: '' }]
  }
  const dbDouble = getDBDouble([response])
  t.deepEqual(count(dbDouble.db)(), 'tally1: 3\ntally2: 1')
})

test('queries::count::count throws an error if no response', (t) => {
  const dbDouble = getDBDouble()
  const error = t.throws(() => count(dbDouble.db)('tally1000'))
  t.is(error.message, ErrorMessage.noTalliesFound)
})

test('queries::count::countFactory returns a function', (t) => {
  const dbDouble = getDBDouble()
  t.is(typeof countFactory(dbDouble.db), 'function')
})
