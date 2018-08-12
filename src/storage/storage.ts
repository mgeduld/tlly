import { DB } from '../enums/db'
import { ErrorMessage } from '../enums/error-message'
import { IDB } from '../interfaces/db'
import { count } from '../queries'

export const getResolvedTally = (
  db: IDB,
  tally: string | undefined
): string => {
  const resolvedTally = tally || db.get(DB.currentTally).value()
  if (resolvedTally) {
    return resolvedTally
  }
  throw new Error(ErrorMessage.noCurrentTally)
}

export const maybeStartNewTally = (
  tallyResults: object,
  db: IDB,
  jsonPath: string
) => {
  if (!tallyResults) {
    db.set(jsonPath, []).write()
  }
}

export const writeUpdatedTallyToDb = (
  db: IDB,
  jsonPath: string,
  amount: number,
  timeStamp?: string
) => {
  const dateTime = timeStamp ? new Date(timeStamp) : new Date()
  db.get(jsonPath)
    .push({ amount, timeStamp: dateTime.toUTCString() })
    .write()
}

export const updateCurrentTally = (db: IDB, resolvedTally: string) => {
  db.set(DB.currentTally, resolvedTally).write()
}

export const updateTally = (
  db: IDB,
  amount: number,
  tally?: string,
  timeStamp?: string
) => {
  const resolvedTally = getResolvedTally(db, tally)
  const jsonPath = `tallies.${resolvedTally}`
  const tallyResults = db.get(jsonPath).value()
  maybeStartNewTally(tallyResults, db, jsonPath)
  writeUpdatedTallyToDb(db, jsonPath, amount, timeStamp)
  updateCurrentTally(db, resolvedTally)
  return resolvedTally
}

export const updateTallyFactory = (db: IDB) => (
  amount: number = 1,
  tally?: string,
  timeStamp?: string
) => {
  return updateTally(db, amount, tally, timeStamp)
}
