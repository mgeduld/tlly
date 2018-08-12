import test from 'ava'
import {
  getResolvedTally,
  maybeStartNewTally,
  writeUpdatedTallyToDb,
  updateCurrentTally,
  updateTallyFactory as factory
} from './storage'
import { getDBDouble } from '../test-fixtures'
import { ErrorMessage } from '../enums/error-message'
import { DB } from '../enums/db'

test('storage::getResolvedTally returns tally name that is passed into it', (t) => {
  const dbDouble = getDBDouble()
  t.is(getResolvedTally(dbDouble.db, 'someTally'), 'someTally')
})

test('storage::getResolvedTally returns tally name that is passed into it even if db returns another name', (t) => {
  const dbDouble = getDBDouble(['someOtherTally'])
  t.is(getResolvedTally(dbDouble.db, 'someTally'), 'someTally')
})

test('storage::getResolvedTally returns tally name from db if no name passed into it', (t) => {
  const dbDouble = getDBDouble(['someOtherTally'])
  t.is(getResolvedTally(dbDouble.db, undefined), 'someOtherTally')
})

test('storage::getResolvedTally throws an error if it no name passed in and no db return name', (t) => {
  const dbDouble = getDBDouble()
  const error = t.throws(() => {
    getResolvedTally(dbDouble.db, undefined)
  })
  t.is(error.message, ErrorMessage.noCurrentTally)
})

test('storage::maybeStartNewTally when called with undefined, set called with correct values', (t) => {
  const dbDouble = getDBDouble()
  maybeStartNewTally(undefined, dbDouble.db, 'tallies.foo')
  t.deepEqual(dbDouble.setCalledWith(), { path: 'tallies.foo', value: [] })
})

test('storage::maybeStartNewTally when called with a value, set is not called', (t) => {
  const dbDouble = getDBDouble()
  maybeStartNewTally({ foo: 'bar' }, dbDouble.db, 'tallies.foo')
  t.is(dbDouble.setCalledWith(), undefined)
})

test('storage::writeUpdatedTallyToDb without timeStamp', (t) => {
  const dbDouble = getDBDouble()
  writeUpdatedTallyToDb(dbDouble.db, 'tallies.foo', 5)
  t.is(dbDouble.getCalledWith(), 'tallies.foo', 'get called with correct value')
  t.is(typeof dbDouble.pushCalledWith(), 'object', 'push called with object')
  t.is(dbDouble.pushCalledWith().amount, 5, 'amount is the correct value')
  t.is(
    typeof dbDouble.pushCalledWith().timeStamp,
    'string',
    'timeStamp is the correct type'
  )
})

test('storage::writeUpdatedTallyToDb with timeStamp', (t) => {
  const dbDouble = getDBDouble()
  writeUpdatedTallyToDb(dbDouble.db, 'tallies.foo', 5, '2017-11-15')
  t.is(dbDouble.getCalledWith(), 'tallies.foo', 'get called with correct value')
  t.is(typeof dbDouble.pushCalledWith(), 'object', 'push called with object')
  t.is(dbDouble.pushCalledWith().amount, 5, 'amount is the correct value')
  t.is(
    typeof dbDouble.pushCalledWith().timeStamp,
    'string',
    'timeStamp is the correct type'
  )
})

test('storage::updateCurrentTally updates calls set with a tally value', (t) => {
  const dbDouble = getDBDouble()
  updateCurrentTally(dbDouble.db, 'foo')
  t.deepEqual(dbDouble.setCalledWith(), { path: DB.currentTally, value: 'foo' })
})

test('storage::updateTally factory returns a function', (t) => {
  const dbDouble = getDBDouble()
  t.is(typeof factory(dbDouble.db), 'function')
})

test('storage::updateTally runs without an error if both anount and tally passed into it', (t) => {
  const dbDouble = getDBDouble()
  const updateTally = factory(dbDouble.db)
  updateTally(1, 'foo')
  t.pass()
})

test('storage::updateTally runs without an error if no number is passed into it but db returns a tally', (t) => {
  const dbDouble = getDBDouble(['foo'])
  const updateTally = factory(dbDouble.db)
  updateTally()
  t.pass()
})

test('storage::updateTally throws and error if no number or  is passed into it and db does not return a tally', (t) => {
  const dbDouble = getDBDouble()
  const updateTally = factory(dbDouble.db)
  const error = t.throws(() => updateTally())
  t.is(error.message, ErrorMessage.noCurrentTally)
})
