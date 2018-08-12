import test from 'ava'
import { getInputValues } from './utils'
import { IArgs } from '../interfaces/args'

test('args::utils::getTallyNameAndAmount', (t) => {
  const args: IArgs = {
    input: ['foo', '1'],
    flags: { reset: false, set: false, delete: false, count: false }
  }
  t.deepEqual(getInputValues(args), {
    tallyName: 'foo',
    amount: '1',
    timeStamp: undefined
  })
})
