import { displayCount as displayCountFactory } from './utils'
import { count } from '../queries'
import { updateTally } from '../storage'
import { seinfeldCount } from '../queries'
import * as commands from './commands'

export const displayCount = displayCountFactory(count)
export const doCount = commands.doCount(displayCount)
export const doTally = commands.doTally(displayCount, updateTally)
export const doSeinfeldCount = commands.doSeinfeldCount(seinfeldCount)
