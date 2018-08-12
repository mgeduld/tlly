export const displayCount = (count: Function) => async (tallyName: string) => {
  const result = await count(tallyName)
  console.log(result)
}
