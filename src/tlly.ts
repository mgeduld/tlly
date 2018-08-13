import meow = require('meow')
import { getHelp, getConfig as getArgsConfig } from './args'
import {
  getInputValues,
  userWantsToCount,
  userWantsToTally,
  userWantsMockTallies,
  userWantsToSeinfeldCount,
  userWantsToSeeTimestampList,
  userWantsToDeleteATally
} from './args'
import { IArgs, IFlags } from './interfaces/args'
import {
  doCount,
  doTally,
  doSeinfeldCount,
  doTimestamp,
  doDeleteTally
} from './commands'
import { addMockTallies } from './demo'

const start = () => {
  const moewResult: any = meow(getHelp(), getArgsConfig() as meow.Options)
  const flags: IFlags = moewResult.flags
  const args: IArgs = { input: moewResult.input, flags }
  const { tallyName, amount, timeStamp } = getInputValues(args)

  try {
    if (userWantsToTally(flags)) {
      doTally(amount, tallyName, timeStamp)
    } else if (userWantsToCount(flags)) {
      doCount(tallyName)
    } else if (userWantsToSeinfeldCount(flags)) {
      doSeinfeldCount(tallyName)
    } else if (userWantsToSeeTimestampList(flags)) {
      doTimestamp(tallyName)
    } else if (userWantsToDeleteATally(flags)) {
      doDeleteTally(tallyName)
    } else if (userWantsMockTallies(flags)) {
      addMockTallies()
    }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = start
