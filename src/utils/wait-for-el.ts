import delay from './delay'

export default async function waitForEl(
  identifier: string,
  parent: Document | HTMLElement = document,
  attempt = 1
): Promise<HTMLElement> {
  if (attempt === 5) throw new Error(`Unable to find "${identifier}"`)

  const el: HTMLElement | null = parent.querySelector(identifier)

  if (el) return el

  await delay(50)
  return waitForEl(identifier, parent, ++attempt)
}
