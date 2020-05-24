import getCookie from '../utils/get-cookie'
import getHostnameFromString from '../utils/get-hostname-from-string'
import $ from '../utils/select'
import $$ from '../utils/wait-for-el-by-innertext'
import waitForElByInnerText from '../utils/wait-for-el-by-innertext'

/*
  https://www.quantcast.com/
  https://iabeurope.eu/
*/

const getCookieConfiguration = function getCookieConfiguration(): string {
  const scripts = document.querySelectorAll('script')
  const library = Array.from(scripts).find(
    ({ src }) => getHostnameFromString(src) === 'static.quantcast.mgr.consensu.org'
  )

  if (!library) throw new Error('Unable to find quantcast configuration')

  const { pathname } = new URL(library.src)
  return pathname
}

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

const handlePopupConfiguration = async function handlePopupConfiguration(): Promise<void> {
  await $('.qc-cmp-ui', {
    maxAttempts: 10,
    timeout: 100,
  })

  await $('.qc-cmp-ui', { maxAttempts: 10, timeout: 100 })
  await openMoreOptions()
  await clickRejectAll()
  await savePreferences()
}

const handleBannerConfiguration = async function handleBannerConfiguration(): Promise<void> {
  const banner = await $('#qcCmpUi')
  const button = await waitForElByInnerText('.qc-cmp-button', banner, 'I do not accept')
  button.click()
}

const handler = async function handler() {
  if (getCookie('euconsent')) return

  try {
    const configuration = getCookieConfiguration()

    console.log(configuration)

    if (configuration.includes('cmpui-banner')) {
      await handleBannerConfiguration()
      return
    }

    if (configuration.includes('cmpui-popup')) {
      await handlePopupConfiguration()
      return
    }
  } catch (error) {
    console.log(error.message)
  }
}

const rule = function rule(): boolean {
  const scripts = document.querySelectorAll('script')
  if (!scripts) return false
  return !!Array.from(scripts).find(({ src }) => getHostnameFromString(src) === 'static.quantcast.mgr.consensu.org')
}

export default { handler, rule }
