import lowdb = require('lowdb')
import FileAsync = require('lowdb/adapters/FileAsync')
import FileSync = require('lowdb/adapters/FileSync')
import * as os from 'os'
import { join } from 'path'
import { countFactory } from './count'
import { seinfeldCountFactory } from './seinfeld-count'
import { dbDefault, dbFile } from '../constants'

export const count = async (...args) => {
  // While I'm generally using sync, there's a bug in lowdb which makes
  // this break when unless it's async. Specifically it breaks if
  // count happens immediately after an update. The update isn't
  // included in the count.
  // See https://github.com/typicode/lowdb/issues/283
  const adapter = new FileAsync(join(os.homedir(), dbFile))
  const db = await lowdb(adapter)
  db.defaults(dbDefault)
  return countFactory(db).apply(null, args)
}

export const seinfeldCount = (...args) => {
  const adapter = new FileSync(join(os.homedir(), dbFile))
  const db = lowdb(adapter)
  db.defaults(dbDefault)
  return seinfeldCountFactory(db).apply(null, args)
}
