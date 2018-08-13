import { IDB } from '../interfaces/db'
import { ErrorMessage } from '../enums/error-message'
import { IContigiousTallies, IContigiousTally } from '../interfaces/tallies'
import { differenceInCalendarDays } from 'date-fns'

export const talliesReducer = (contiguousTallies: IContigiousTallies) => (
  counts: string[],
  tallyName: string
): string[] => {
  const record = contiguousTallies[tallyName]
  const dateDiff = differenceInCalendarDays(new Date(), new Date(record.last))
  counts.push(`${tallyName}: ${dateDiff > 1 ? 0 : record.count}`)
  return counts
}

export const getTotal = (contiguousTallies: IContigiousTallies) => {
  const totals = Object.keys(contiguousTallies).reduce(
    talliesReducer(contiguousTallies),
    []
  )
  return totals.join('\n')
}

export const getContiguousResponseValue = (
  db: IDB,
  tally?: string
): object | undefined => {
  return tally
    ? db.get(`contiguous.${tally}`).value()
    : db.get('contiguous').value()
}

export const normalizeContiguousTallies = (
  contiguousTalliesResponseValue: any,
  tally?: string
): IContigiousTallies => {
  return contiguousTalliesResponseValue.count !== undefined &&
    contiguousTalliesResponseValue.timeStamp! == undefined
    ? ({ [tally]: contiguousTalliesResponseValue } as IContigiousTallies)
    : (contiguousTalliesResponseValue as IContigiousTallies)
}

export const seinfeldCount = (db: IDB) => (tally?: string): string => {
  const contiguousResponseValue:
    | IContigiousTally
    | IContigiousTallies
    | {} = getContiguousResponseValue(db, tally)

  if (!contiguousResponseValue) {
    throw new Error(ErrorMessage.noTalliesFound)
  }
  const contiguousTallies = normalizeContiguousTallies(
    contiguousResponseValue,
    tally
  )
  return getTotal(contiguousTallies)
}

export const seinfeldCountFactory = (db: IDB) => {
  return seinfeldCount(db)
}
