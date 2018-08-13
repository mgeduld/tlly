import test from 'ava'
import { getDBDouble } from '../test-fixtures'
import { getTalliesResponseValue, normalizeTallies } from './utils'

test('queries::count::getTalliesResponseValue returns an array when passed a tally name', (t) => {
  const dbResponse = [
    { amount: 1, timeStamp: '' },
    { amount: 1, timeStamp: '' },
    { amount: 1, timeStamp: '' }
  ]
  const dbDouble = getDBDouble([dbResponse])
  t.is(getTalliesResponseValue(dbDouble.db, 'tally1'), dbResponse)
})

test('queries::count::getTalliesResponseValue returns an object when not passed a tally name', (t) => {
  const dbResponse = {
    tally1: [
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' },
      { amount: 1, timeStamp: '' }
    ],
    tally2: [{ amount: 1, timeStamp: '' }]
  }
  const dbDouble = getDBDouble([dbResponse])
  t.is(getTalliesResponseValue(dbDouble.db), dbResponse)
})

test('queries::count::normalizeTallies returns its first param if no second param', (t) => {
  t.deepEqual(normalizeTallies({ t1: [] }), { t1: [] })
})

test('queries::count::normalizeTallies returns its first param wrapped if ther is a second param', (t) => {
  t.deepEqual(normalizeTallies([], 't1'), { t1: [] })
})
