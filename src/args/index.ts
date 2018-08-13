import * as checks from './checks'
import * as config from './config'
import * as utils from './utils'

export const userWantsToCount = checks.userWantsToCount
export const userWantsToTally = checks.userWantsToTally
export const userWantsMockTallies = checks.userWantsMockTallies
export const userWantsToSeinfeldCount = checks.userWantsToSeinfeldCount
export const userWantsToSeeTimestampList = checks.userWantsToSeeTimestampList
export const userWantsToDeleteATally = checks.userWantsToDeleteATally
export const getInputValues = utils.getInputValues
export const getConfig = config.getConfig
export const getHelp = config.getHelp
