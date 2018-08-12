import test from 'ava'
import { getInputValues } from './utils'
import { IArgs } from '../interfaces/args'
import { getFlags } from '../test-fixtures'

test('args::utils::getTallyNameAndAmount', (t) => {
  const args: IArgs = {
    input: ['foo', '1'],
    flags: getFlags()
  }
  t.deepEqual(getInputValues(args), {
    tallyName: 'foo',
    amount: '1',
    timeStamp: undefined
  })
})
