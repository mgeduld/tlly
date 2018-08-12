import meow = require('meow')
import { getHelp, getConfig } from './args'
import {
  getInputValues,
  userWantsToCount,
  userWantsToTally,
  userWantsMockTallies
} from './args'
import { IArgs, IFlags } from './interfaces/args'
import { doCount, doTally } from './commands'
import { addMockTallies } from './demo'

const moewResult: any = meow(getHelp(), getConfig() as meow.Options)
const flags: IFlags = moewResult.flags
const args: IArgs = { input: moewResult.input, flags }
const { tallyName, amount, timeStamp } = getInputValues(args)

if (userWantsToTally(flags)) {
  doTally(amount, tallyName, timeStamp)
} else if (userWantsToCount(flags)) {
  doCount(tallyName)
} else if (userWantsMockTallies) {
  addMockTallies()
}
