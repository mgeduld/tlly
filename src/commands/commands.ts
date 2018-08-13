export const doTally = (displayCount: Function, updateTally: Function) => (
  amount?: any,
  tallyName?: string,
  timeStamp?: string
) => {
  const resolvedTallyName = updateTally(
    amount && !isNaN(Number(amount)) ? Number(amount) : undefined,
    tallyName,
    timeStamp
  )

  displayCount(resolvedTallyName)
}

export const doCount = (displayCount: Function) => (tallyName?: string) => {
  displayCount(tallyName)
}

export const doSeinfeldCount = (seinfeldCount: Function) => (
  tallyName?: string
) => {
  const count = seinfeldCount(tallyName)
  console.log(count)
}

export const doTimestamp = (timestamp: Function) => (tallyName?: string) => {
  const count = timestamp(tallyName)
  console.log(count)
}

export const doDeleteTally = (deleteTally: Function) => (tallyName: string) => {
  deleteTally(tallyName)
}
