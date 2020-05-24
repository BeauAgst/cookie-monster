import delay from '../utils/delay'
import $ from '../utils/select'
import $$ from '../utils/select-all'

const clickManageButton = async function clickManageButton() {
  const button = await $('#onetrust-pc-btn-handler')
  button.click()
}

const toggleAllInputs = async function toggleAllInputs(): Promise<void> {
  const inputs = (await $$('#onetrust-consent-sdk .category-switch-handler')) as HTMLInputElement[]

  inputs.map(input => {
    if (!input.checked) return
    input.click()
  })
}

const savePreferences = async function savePreferences(): Promise<void> {
  const button = await $('#onetrust-consent-sdk .save-preference-btn-handler')
  button.click()
}

const handler = async function handler(): Promise<void> {
  try {
    const cookieBanner = await $('#onetrust-banner-sdk', {
      maxAttempts: 10,
      timeout: 100,
    })
    if (cookieBanner.style.display === 'none') return

    await clickManageButton()
    await toggleAllInputs()
    await delay(500)
    await savePreferences()
  } catch (error) {
    console.log(error.message)
  }
}

const rule = async function rule(): Promise<boolean> {
  try {
    const cookieBanner = await $('#onetrust-banner-sdk')
    return !!cookieBanner
  } catch (error) {
    return false
  }
}

export default {
  rule,
  handler,
}
