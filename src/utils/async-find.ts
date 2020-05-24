export default async function asyncFind(arr: unknown[], cb: (arg: any) => Promise<boolean>): Promise<unknown> {
  const promises = arr.map(cb)
  const results = await Promise.all(promises)
  const index = results.findIndex(result => result)
  return arr[index]
}
