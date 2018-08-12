import { IArgs } from '../interfaces/args'

export const getInputValues = (args: IArgs) => {
  const [tallyName, amount, timeStamp] = args.input
  return {
    tallyName,
    amount,
    timeStamp
  }
}
