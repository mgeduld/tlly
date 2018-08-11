import meow, { Options } from 'meow'
import { help, config } from './args'

const args = meow(help, config as Options)

console.log(args)
