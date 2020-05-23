import getCookie from '../utils/get-cookie'
import getHostnameFromString from '../utils/get-hostname-from-string'
import $ from '../utils/select'
import $$ from '../utils/wait-for-el-by-innertext'

/*
  https://www.quantcast.com/
  https://iabeurope.eu/
*/

const openMoreOptions = async function openMoreOptions(): Promise<void> {
  const button = await $$('.qc-cmp-button', document, 'more options')
  button.click()
}

const clickRejectAll = async function clickRejectAll(): Promise<void> {
  const button = await $$('.qc-cmp-button', document, 'reject all')
  button.click()
}

const savePreferences = async function savePreferences(): Promise<void> {
  const button = await $$('.qc-cmp-button', document, 'save &amp; exit')
  button.click()
}

const handler = async function handler() {
  if (getCookie('euconsent')) return

  try {
    await $('.qc-cmp-ui', {
      maxAttempts: 10,
      timeout: 100,
    })

    await $('.qc-cmp-ui', { maxAttempts: 10, timeout: 100 })
    await openMoreOptions()
    await clickRejectAll()
    await savePreferences()
  } catch (error) {
    console.log(error.message)
  }
}

const rule = function rule(): boolean {
  const scripts = document.querySelectorAll('script')
  if (!scripts) return false
  return !!Array.from(scripts).find(({ src }) => getHostnameFromString(src) === 'quantcast.mgr.consensu.org')
}

export default { handler, rule }
