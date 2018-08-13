import test from 'ava'
import { getDBDouble } from '../test-fixtures'
import { deleteTally, deleteTallyFactory } from './delete'

test('storage::delete::deleteTally', (t) => {
  const dbDouble = getDBDouble()
  deleteTally(dbDouble.db, 'foo')
  t.deepEqual(dbDouble.unsetCalledWith(), ['tallies.foo', 'contiguous.foo'])
})

test('storage::delete:deleteTallyFactory', (t) => {
  const dbDouble = getDBDouble()
  deleteTallyFactory(dbDouble.db)('foo')
  t.deepEqual(dbDouble.unsetCalledWith(), ['tallies.foo', 'contiguous.foo'])
})
