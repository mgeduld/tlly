import lowdb = require('lowdb')
import FileSync = require('lowdb/adapters/FileSync')
import * as os from 'os'
import { join } from 'path'
import { updateTallyFactory } from './storage'
import { deleteTallyFactory } from './delete'
import { dbDefault, dbFile } from '../constants'

const adapter = new FileSync(join(os.homedir(), dbFile))
const db = lowdb(adapter)
db.defaults(dbDefault)

export const updateTally = (...args) => {
  return updateTallyFactory(db).apply(null, args)
}

export const deleteTally = (...args) => {
  return deleteTallyFactory(db).apply(null, args)
}
