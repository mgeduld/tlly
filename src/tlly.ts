import meow, { Options } from 'meow'
import { help, config } from './args'
import { updateTally } from './storage'
import { count } from './queries'

const args = meow(help, config as Options)

const {
  reset: resetFlag,
  set: setFlag,
  count: countFlag,
  delete: deleteFlag
} = args.flags

const noFlags = Object.keys(args.flags).every((key) => !args.flags[key])

const [tallyName, amount]: string[] = args.input

const countEm = async (tallyName: string) => {
  const result = await count(tallyName)
  console.log(result)
}

if (noFlags && (tallyName || !args.input.length)) {
  const resolvedTallyName = updateTally(
    amount && !isNaN(Number(amount)) ? Number(amount) : undefined,
    tallyName
  )
  countEm(resolvedTallyName)
} else if (args.flags.count) {
  countEm(tallyName)
}
