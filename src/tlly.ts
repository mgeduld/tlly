import * as meow from 'meow'
import { getHelp, getConfig } from './args/config'
import {
  getTallyNameAndAmount,
  userWantsToCount,
  userWantsToTally
} from './args'
import { IArgs, IFlags } from './interfaces/args'
import { doCount, doTally } from './commands'

const moewResult: any = meow(getHelp(), getConfig() as meow.Options)
const flags: IFlags = moewResult.flags
const args: IArgs = { input: moewResult.input, flags }
const { tallyName, amount } = getTallyNameAndAmount(args)

if (userWantsToTally(flags)) {
  doTally(amount, tallyName)
} else if (userWantsToCount(flags)) {
  doCount(tallyName)
}
