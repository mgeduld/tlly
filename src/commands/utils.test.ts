import test from 'ava'
import { displayCount } from './utils'

test('commands::utils::displayCount', async (t) => {
  t.plan(1)
  await displayCount((value) => {
    t.is(value, 'tally1')
  })('tally1')
})
