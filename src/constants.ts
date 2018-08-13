import * as os from 'os'
import { join } from 'path'
import { getConfig } from './config'

export const dbDefault = {
  currentTally: undefined,
  tallies: {},
  contiguous: {}
}

const configLocation = getConfig().dbLocation

export const dbLocation = join(
  getConfig().dbLocation || os.homedir(),
  '.tllydb.json'
)
