export type IJSONValue =
  | { [key: string]: IJSONValue }
  | any[]
  | string
  | number
  | boolean

export interface IWrite {
  (): void
}

export interface IDB {
  get: (
    path: string
  ) => {
    value: () => any
    push: (value: IJSONValue) => { write: IWrite }
  }
  set: (path: string, value: IJSONValue) => { write: IWrite }
}
