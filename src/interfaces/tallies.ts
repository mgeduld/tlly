export interface ITally {
  amount: number
  timeStamp: string
}

export interface ITallies {
  [key: string]: ITally[]
}

export interface IContigiousTally {
  count: number
  last: string
}

export interface IContigiousTallies {
  [key: string]: IContigiousTally
}
