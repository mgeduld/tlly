import test from 'ava'
import { doTally, doCount, doSeinfeldCount } from './commands'

test('commands::doTally with args', (t) => {
  t.plan(2)
  doTally(
    (value) => {
      t.is(value, 'tally1', 'displayCount called with correct value')
    },
    (...args) => {
      t.deepEqual(
        args,
        [4, 'tally1', undefined],
        'updateTally called with correct values'
      )
      return 'tally1'
    }
  )(4, 'tally1')
})

test('commands::doTally without args', (t) => {
  t.plan(2)
  doTally(
    (value) => {
      t.is(value, undefined, 'displayCount called with undefined value')
    },
    (...args) => {
      t.deepEqual(
        args,
        [undefined, undefined, undefined],
        'updateTally called with undefined values'
      )
      return undefined
    }
  )()
})

test('commants::doCount', (t) => {
  t.plan(1)
  doCount((value) => {
    t.is(value, 'tally1')
  })('tally1')
})

test('commants::doSeinfeldCount', (t) => {
  t.plan(1)
  doSeinfeldCount((value) => {
    t.is(value, 'tally1')
  })('tally1')
})
