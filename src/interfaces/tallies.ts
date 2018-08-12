export interface ITally {
  amount: number
  timeStamp: string
}

export interface ITallies {
  [key: string]: ITally[]
}
