import { IDB } from '../interfaces/db'

export const deleteTally = (db: IDB, tallyName: string) => {
  db.unset(`tallies.${tallyName}`).write()
  db.unset(`contiguous.${tallyName}`).write()
}

export const deleteTallyFactory = (db: IDB) => (tallyName: string) => {
  deleteTally(db, tallyName)
}
