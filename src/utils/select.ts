import delay from './delay'

interface Options {
  maxAttempts: number
  parent: Document | HTMLElement
  timeout: number
}

const baseOptions: Options = {
  maxAttempts: 5,
  parent: document,
  timeout: 50,
}

export default async function $(identifier: string, opts?: Partial<Options>, attempt = 1): Promise<HTMLElement> {
  const options = Object.assign({}, baseOptions, opts)
  if (attempt > options.maxAttempts) throw new Error(`Unable to find "${identifier}"`)

  const el: HTMLElement | null = options.parent.querySelector(identifier)

  if (el) return el

  await delay(options.timeout)
  return $(identifier, opts, ++attempt)
}
