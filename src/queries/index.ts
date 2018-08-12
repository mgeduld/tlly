import lowdb = require('lowdb')
import FileAsync = require('lowdb/adapters/FileAsync')
import * as os from 'os'
import { join } from 'path'
import { countFactory } from './count'

export const count = async (...args) => {
  // While I'm generally using sync, there's a bug in lowdb which makes
  // this break when unless it's async. Specifically it breaks if
  // count happens immediately after an update. The update isn't
  // included in the count.
  // See https://github.com/typicode/lowdb/issues/283
  const adapter = new FileAsync(join(os.homedir(), '.tallydb.json'))
  const db = await lowdb(adapter)
  db.defaults({ currentTally: undefined, tallies: {} })
  return countFactory(db).apply(null, args)
}
