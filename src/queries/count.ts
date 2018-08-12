import { IDB } from '../interfaces/db'
import { ErrorMessage } from '../enums/error-message'

interface ITally {
  amount: number
  timeStamp: string
}

export const tallyReducer = (result: number, tally: ITally) => {
  return (result += tally.amount)
}

export const talliesReducer = (tallies: object) => (
  counts: string[],
  tallyName: string
): string[] => {
  const listOfTallies = tallies[tallyName]
  const total = listOfTallies.reduce(tallyReducer, 0)
  counts.push(`${tallyName}: ${total}`)
  return counts
}

export const getTotal = (tallies: object) => {
  const totals = Object.keys(tallies).reduce(talliesReducer(tallies), [])
  return totals.join('\n')
}

export const getTalliesResponseValue = (
  db: IDB,
  tally?: string
): object | any[] | undefined => {
  return tally ? db.get(`tallies.${tally}`).value() : db.get('tallies').value()
}

export const normalizeTallies = (
  talliesResponseValue: object | any[],
  tally?: string
): object => {
  return Array.isArray(talliesResponseValue)
    ? { [tally]: talliesResponseValue }
    : talliesResponseValue
}

export const count = (db: IDB) => (tally?: string): string => {
  const talliesResponseValue = getTalliesResponseValue(db, tally)
  if (!talliesResponseValue) {
    throw new Error(ErrorMessage.noTalliesFound)
  }
  const tallies = normalizeTallies(talliesResponseValue, tally)
  return getTotal(tallies)
}

export const countFactory = (db: IDB) => {
  return count(db)
}
