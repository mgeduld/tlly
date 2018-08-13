import { IFlags } from '../interfaces/args'

export const hasNoFlagsSet = (flags: IFlags) => {
  return Object.keys(flags).every((key) => flags[key] === false)
}

export const userWantsToTally = (flags: IFlags) => hasNoFlagsSet(flags)

export const userWantsToCount = (flags: IFlags) => flags.count

export const userWantsMockTallies = (flags: IFlags) => flags.demo

export const userWantsToSeinfeldCount = (flags: IFlags) => flags.seinfeldCount

export const userWantsToSeeTimestampList = (flags: IFlags) => flags.timestamp

export const userWantsToDeleteATally = (flags: IFlags) => flags.delete
