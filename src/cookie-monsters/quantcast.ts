import getCookie from '../utils/get-cookie'
import waitForEl from '../utils/wait-for-el'
import waitForElByInnerText from '../utils/wait-for-el-by-innertext'

/*
  https://www.quantcast.com/
  https://iabeurope.eu/
*/

const openMoreOptions = async function openMoreOptions(): Promise<void> {
  const button = await waitForElByInnerText('.qc-cmp-button', document, 'more options')
  button.click()
}

const clickRejectAll = async function clickRejectAll(): Promise<void> {
  const button = await waitForElByInnerText('.qc-cmp-button', document, 'reject all')
  button.click()
}

const savePreferences = async function savePreferences(): Promise<void> {
  const button = await waitForElByInnerText('.qc-cmp-button', document, 'save &amp; exit')
  button.click()
}

export default async function quantcastHandler() {
  if (getCookie('euconsent')) return

  try {
    await waitForEl('.qc-cmp-ui', {
      maxAttempts: 10,
      timeout: 100,
    })

    await waitForEl('.qc-cmp-ui', { maxAttempts: 10, timeout: 100 })
    await openMoreOptions()
    await clickRejectAll()
    await savePreferences()
  } catch (error) {
    console.log(error.message)
  }
}
