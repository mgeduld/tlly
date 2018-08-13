import { IDB } from '../interfaces/db'
import { ErrorMessage } from '../enums/error-message'
import { ITallies, ITally } from '../interfaces/tallies'
import { getTalliesResponseValue, normalizeTallies } from './utils'

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
