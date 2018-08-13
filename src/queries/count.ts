import { IDB } from '../interfaces/db'
import { ErrorMessage } from '../enums/error-message'
import { ITallies, ITally } from '../interfaces/tallies'

export const tallyReducer = (result: number, tally: ITally) => {
  return (result += tally.amount)
}

export const talliesReducer = (tallies: ITallies) => (
  counts: string[],
  tallyName: string
): string[] => {
  const listOfTallies = tallies[tallyName]
  const total = listOfTallies.reduce(tallyReducer, 0)
  counts.push(`${tallyName}: ${total}`)
  return counts
}

export const getTotal = (tallies: ITallies) => {
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
  talliesResponseValue: ITallies | ITally[],
  tally?: string
): ITallies => {
  return Array.isArray(talliesResponseValue)
    ? { [tally]: talliesResponseValue }
    : talliesResponseValue
}

export const count = (db: IDB) => (tally?: string): string => {
  const talliesResponseValue:
    | ITallies
    | ITally[]
    | {} = getTalliesResponseValue(db, tally)

  if (!talliesResponseValue) {
    throw new Error(ErrorMessage.noTalliesFound)
  }
  const tallies = normalizeTallies(talliesResponseValue, tally)
  return getTotal(tallies)
}

export const countFactory = (db: IDB) => {
  return count(db)
}
