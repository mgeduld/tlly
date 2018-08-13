import { displayCount as displayCountFactory } from './utils'
import { count, seinfeldCount, timestamp } from '../queries'
import { updateTally, deleteTally } from '../storage'
import * as commands from './commands'

export const displayCount = displayCountFactory(count)
export const doCount = commands.doCount(displayCount)
export const doTally = commands.doTally(displayCount, updateTally)
export const doSeinfeldCount = commands.doSeinfeldCount(seinfeldCount)
export const doTimestamp = commands.doTimestamp(timestamp)
export const doDeleteTally = commands.doDeleteTally(deleteTally)
