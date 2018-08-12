export const doTally = (displayCount: Function, updateTally: Function) => (
  amount?: any,
  tallyName?: string
) => {
  const resolvedTallyName = updateTally(
    amount && !isNaN(Number(amount)) ? Number(amount) : undefined,
    tallyName
  )

  displayCount(resolvedTallyName)
}

export const doCount = (displayCount: Function) => (tallyName?: string) => {
  displayCount(tallyName)
}
