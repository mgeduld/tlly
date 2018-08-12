import { IArgs } from '../interfaces/args'

export const getTallyNameAndAmount = (args: IArgs) => {
  return { tallyName: args.input[0], amount: args.input[1] }
}
