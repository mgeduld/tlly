export interface IFlags {
  reset: boolean
  set: boolean
  count: boolean
  delete: boolean
}

export interface IArgs {
  input: string[]
  flags: IFlags
}
