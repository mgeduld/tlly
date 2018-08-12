import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import os from 'os'
import { join } from 'path'
import { updateTally as updateTallyFactory } from './storage'

const adapter = new FileSync(join(os.homedir(), '.tallydb.json'))
const db = lowdb(adapter)
db.defaults({ currentTally: undefined, tallies: {} })

export const updateTally = async (...args) => {
  return updateTallyFactory(db).apply(null, args)
}
