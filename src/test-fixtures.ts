import { IDB, IJSONValue } from './interfaces/db'
import { IFlags } from './interfaces/args'

interface IGetDB {
  db: IDB
  getCalledWith: () => any
  pushCalledWith: () => any
  setCalledWith: () => any
  unsetCalledWith: () => any
  valueCalled: () => boolean
  writeCalledFromGet: () => boolean
  writeCalledFromSet: () => boolean
  writeCalledFromUnset: () => boolean
}

export const getDBDouble = (getValue?: any[]): IGetDB => {
  let responseIndex = 0
  let getCalledWith: any[] = []
  let pushCalledWith: any[] = []
  let setCalledWith: any[] = []
  let unsetCalledWith: any[] = []
  let valueCalled = false
  let writeCalledFromGet = false
  let writeCalledFromSet = false
  let writeCalledFromUnset = false
  return {
    getCalledWith: () => getCalledWith,
    pushCalledWith: () => pushCalledWith,
    setCalledWith: () => setCalledWith,
    valueCalled: () => valueCalled,
    writeCalledFromGet: () => writeCalledFromGet,
    writeCalledFromSet: () => writeCalledFromSet,
    writeCalledFromUnset: () => writeCalledFromUnset,
    unsetCalledWith: () => unsetCalledWith,
    db: {
      get(path: string) {
        getCalledWith.push(path)
        return {
          value() {
            valueCalled = true
            return (getValue && getValue[responseIndex++]) || undefined
          },
          push(value: IJSONValue) {
            pushCalledWith.push(value)
            return {
              write() {
                writeCalledFromGet = true
              }
            }
          }
        }
      },
      set(path: string, value: IJSONValue) {
        setCalledWith.push({ path, value })
        return {
          write() {
            writeCalledFromSet = true
          }
        }
      },
      unset(path: string) {
        unsetCalledWith.push(path)
        return {
          write() {
            writeCalledFromUnset = true
          }
        }
      }
    }
  }
}

export const getFlags = (trueFlag?: string) => {
  const flags: IFlags = {
    count: false,
    delete: false,
    demo: false,
    seinfeldCount: false,
    timestamp: false
  }

  if (flags[trueFlag] !== undefined) {
    flags[trueFlag] = true
  }

  return flags
}
