import test from 'ava'
import { userWantsToCount, userWantsToTally } from './checks'
import { IFlags } from '../interfaces/args'

test('args::checks::userWantsToTally', (t) => {
  const flags: IFlags = {
    reset: false,
    set: false,
    delete: false,
    count: false
  }
  t.true(userWantsToTally(flags), 'returns true when all flags are false')
  flags.set = true
  t.false(userWantsToTally(flags), 'returns false when any flags are true')
})

test('args::checks::userWantsToCount', (t) => {
  const flags: IFlags = {
    reset: false,
    set: false,
    delete: false,
    count: true
  }
  t.true(userWantsToCount(flags), 'returns true when all count flag is true')
  flags.count = false
  t.false(userWantsToCount(flags), 'returns false when count flags is false')
})
