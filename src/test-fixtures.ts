import { IDB, IJSONValue } from './interfaces/db'
import { IFlags } from './interfaces/args'

interface IGetDB {
  db: IDB
  getCalledWith: () => any
  pushCalledWith: () => any
  setCalledWith: () => any
  valueCalled: () => boolean
  writeCalledFromGet: () => boolean
  writeCalledFromSet: () => boolean
}

export const getDBDouble = (getValue?: any[]): IGetDB => {
  let responseIndex = 0
  let getCalledWith: any = undefined
  let pushCalledWith: any = undefined
  let setCalledWith: any = undefined
  let valueCalled = false
  let writeCalledFromGet = false
  let writeCalledFromSet = false
  return {
    getCalledWith: () => getCalledWith,
    pushCalledWith: () => pushCalledWith,
    setCalledWith: () => setCalledWith,
    valueCalled: () => valueCalled,
    writeCalledFromGet: () => writeCalledFromGet,
    writeCalledFromSet: () => writeCalledFromSet,
    db: {
      get(path: string) {
        getCalledWith = path
        return {
          value() {
            valueCalled = true
            return (getValue && getValue[responseIndex++]) || undefined
          },
          push(value: IJSONValue) {
            pushCalledWith = value
            return {
              write() {
                writeCalledFromGet = true
              }
            }
          }
        }
      },
      set(path: string, value: IJSONValue) {
        setCalledWith = { path, value }
        return {
          write() {
            writeCalledFromSet = true
          }
        }
      }
    }
  }
}

export const getFlags = (trueFlag?: string) => {
  const flags: IFlags = {
    reset: false,
    set: false,
    count: false,
    delete: false,
    demo: false
  }

  if (flags[trueFlag] !== undefined) {
    flags[trueFlag] = true
  }

  return flags
}
