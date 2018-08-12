import lowdb = require('lowdb')
import FileSync = require('lowdb/adapters/FileSync')
import * as os from 'os'
import { join } from 'path'
import { updateTallyFactory } from './storage'

const adapter = new FileSync(join(os.homedir(), '.tallydb.json'))
const db = lowdb(adapter)
db.defaults({ currentTally: undefined, tallies: {} })

export const updateTally = (...args) => {
  return updateTallyFactory(db).apply(null, args)
}
