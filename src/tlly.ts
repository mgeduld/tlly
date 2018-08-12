import meow, { Options } from 'meow'
import { help, config } from './args'
import { updateTally } from './storage'

const args = meow(help, config as Options)
const [tallyName, amount]: string[] = args.input
if (tallyName || !args.input.length) {
  updateTally(amount, tallyName)
}
