import { subDays } from 'date-fns'
import { range } from 'lodash'
import { doTally } from './commands/'
import { updateTally } from './storage'

const getLastNDaysAsStrings = (
  n: number,
  gap: number = 0,
  date: Date = new Date()
): string[] => {
  return range(1 + gap, n + gap)
    .reverse()
    .map((offset: number) => {
      return subDays(date, offset).toISOString()
    })
}

const addTally = (name: string, dates: string[]) => {
  dates.forEach((date) => {
    updateTally(1, name, date)
  })
  console.log(`Added tally ${name}`)
}

export const addMockTallies = () => {
  addTally('_exercise', getLastNDaysAsStrings(10))
  addTally('_meditation', getLastNDaysAsStrings(10, 2))
}
