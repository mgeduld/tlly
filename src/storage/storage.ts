import { DB } from '../enums/db'
import { ErrorMessage } from '../enums/error-message'
import { IDB } from '../interfaces/db'
import { differenceInCalendarDays } from 'date-fns'

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
  tallyName: string
) => {
  if (!tallyResults) {
    db.set(`tallies.${tallyName}`, []).write()
    db.set(`contiguous.${tallyName}`, { count: 0, last: '' }).write()
  }
}

export const writeContiguousUpdateToDb = (
  db: IDB,
  tallyName: string,
  amount: number,
  timeStamp: string
) => {
  const dateTime = timeStamp ? new Date(timeStamp) : new Date()
  const newLast = dateTime.toUTCString()
  const contiguous = db.get(`contiguous.${tallyName}`).value()
  const { count, last } = contiguous
  const lastDate = new Date(last)
  const newCount =
    !last || differenceInCalendarDays(new Date(dateTime), lastDate) > 1
      ? 1
      : count + amount
  db.set(`contiguous.${tallyName}`, { count: newCount, last: newLast }).write()
}

export const writeUpdatedTallyToDb = (
  db: IDB,
  tallyName: string,
  amount: number,
  timeStamp?: string
) => {
  const dateTime = timeStamp ? new Date(timeStamp) : new Date()
  db.get(`tallies.${tallyName}`)
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
  const tallyResults = db.get(`tallies.${resolvedTally}`).value()
  maybeStartNewTally(tallyResults, db, resolvedTally)
  writeUpdatedTallyToDb(db, resolvedTally, amount, timeStamp)
  writeContiguousUpdateToDb(db, resolvedTally, amount, timeStamp)
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
