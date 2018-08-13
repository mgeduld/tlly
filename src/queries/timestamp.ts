import { IDB } from '../interfaces/db'
import { ErrorMessage } from '../enums/error-message'
import { ITallies, ITally } from '../interfaces/tallies'

export const tallyMap = (tallyName: string) => (tally: ITally) => {
  return `${tallyName}: ${tally.amount} (${tally.timeStamp})`
}

export const talliesReducer = (tallies: ITallies) => (
  counts: string[],
  tallyName: string
): string[] => {
  const listOfTallies = tallies[tallyName]
  const records = listOfTallies.map(tallyMap(tallyName)).join('\n')
  counts.push(records)
  return counts
}

export const getList = (tallies: ITallies) => {
  const totals = Object.keys(tallies).reduce(talliesReducer(tallies), [])
  return totals.join('\n\n')
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

export const timestamp = (db: IDB) => (tally?: string): string => {
  const talliesResponseValue:
    | ITallies
    | ITally[]
    | {} = getTalliesResponseValue(db, tally)

  if (!talliesResponseValue) {
    throw new Error(ErrorMessage.noTalliesFound)
  }
  const tallies = normalizeTallies(talliesResponseValue, tally)
  return getList(tallies)
}

export const timestampFactory = (db: IDB) => {
  return timestamp(db)
}
