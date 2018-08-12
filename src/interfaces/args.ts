export interface IFlags {
  reset: boolean
  set: boolean
  count: boolean
  delete: boolean
  demo: boolean
}

export interface IArgs {
  input: string[]
  flags: IFlags
}
