export interface IFlags {
  seinfeldCount: boolean
  timestamp: boolean
  count: boolean
  delete: boolean
  demo: boolean
}

export interface IArgs {
  input: string[]
  flags: IFlags
}
