import { IDB } from '../interfaces/db'
import { ITallies, ITally } from '../interfaces/tallies'

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
