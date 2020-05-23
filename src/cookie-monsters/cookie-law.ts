import waitForEl from '../utils/wait-for-el'

/*
  https://www.cookielaw.org/

  Cookies that can be disabled:
  > Performance
  > Targeting
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
  const button = await waitForEl(`${tab} button`, modal)
  button.click()
}

const toggleActiveState = async function toggleActiveState(modal: HTMLElement): Promise<void> {
  const toggle = (await waitForEl('.optanon-status-checkbox', modal)) as HTMLInputElement
  if (toggle.checked) return
  toggle.click()
}

const savePrefernces = async function savePreferences(modal: HTMLElement): Promise<void> {
  const button = await waitForEl('button[aria-label="Save Settings"]', modal)
  button.click()
}

export default async function cookieLawHandler() {
  try {
    const settingsContainer = await waitForEl('.optanon-alert-box-wrapper')
    if (settingsContainer.style.display === 'none') return

    await clickSettingsButton()
    const modal = await waitForEl('#optanon')
    await disableAllCookies(modal)
    await savePrefernces(modal)
  } catch (error) {
    console.log(error)
  }
}
