import delay from './delay'

export default async function waitForElByInnerText(
  identifier: string,
  parent: Document | HTMLElement = document,
  text: string,
  attempt = 1
): Promise<HTMLElement> {
  if (attempt === 5) throw new Error(`Unable to find "${identifier}"`)

  const matches: NodeListOf<HTMLElement> | null = parent.querySelectorAll(identifier)

  if (matches) {
    const el = Array.from(matches).find(el => el.innerHTML.trim().toLowerCase() === text.trim().toLowerCase())

    if (el) return el
  }

  await delay(50)
  return waitForElByInnerText(identifier, parent, text, ++attempt)
}
