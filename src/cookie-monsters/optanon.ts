import waitForEl from '../utils/wait-for-el'

/*
  https://www.cookielaw.org/optanon-eprivacy/how-optanon-works/
*/

const clickSettingsButton = async function clickSettingsButton(): Promise<void> {
  const cookieSettingsButton = await waitForEl('.cookie-settings-button')
  cookieSettingsButton.click()
}

const disableAllCookies = async function disableAllCookies(modal: HTMLElement) {
  const tabs = ['.menu-item-performance', '.menu-item-advertising']

  for (const tab of tabs) {
    await setTab(modal, tab)
    await toggleActiveState(modal)
  }
}

const setTab = async function setTab(modal: HTMLElement, tab: string): Promise<void> {
  const button = await waitForEl(`${tab} button`, { parent: modal })
  button.click()
}

const toggleActiveState = async function toggleActiveState(modal: HTMLElement): Promise<void> {
  const toggle = (await waitForEl('.optanon-status-checkbox', {
    parent: modal,
  })) as HTMLInputElement
  if (toggle.checked) return
  toggle.click()
}

const savePrefernces = async function savePreferences(modal: HTMLElement): Promise<void> {
  const button = await waitForEl('button[aria-label="Save Settings"]', { parent: modal })
  button.click()
}

const handler = async function handler(): Promise<void> {
  try {
    const settingsContainer = await waitForEl('.optanon-alert-box-wrapper', { maxAttempts: 10, timeout: 100 })
    if (settingsContainer.style.display === 'none') return

    await clickSettingsButton()
    const modal = await waitForEl('#optanon')
    await disableAllCookies(modal)
    await savePrefernces(modal)
  } catch (error) {
    console.log(error.message)
  }
}

const rule = function rule(): boolean {
  const allScripts: HTMLLinkElement[] | null = Array.from(document.querySelectorAll('link[type="text/css"]'))
  if (!allScripts.length) return false

  return !!allScripts.find(({ href }) => href.includes('optanon.css'))
}

export default {
  rule,
  handler,
}
