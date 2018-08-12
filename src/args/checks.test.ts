import test from 'ava'
import { userWantsToCount, userWantsToTally } from './checks'
import { IFlags } from '../interfaces/args'
import { getFlags } from '../test-fixtures'

test('args::checks::userWantsToTally', (t) => {
  const flags: IFlags = getFlags()
  t.true(userWantsToTally(flags), 'returns true when all flags are false')
  flags.set = true
  t.false(userWantsToTally(flags), 'returns false when any flags are true')
})

test('args::checks::userWantsToCount', (t) => {
  const flags: IFlags = getFlags('count')
  t.true(userWantsToCount(flags), 'returns true when count flag is true')
  flags.count = false
  t.false(userWantsToCount(flags), 'returns false when count flag is false')
})
