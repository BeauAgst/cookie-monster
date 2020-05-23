import getHostname from './utils/get-hostname'
import cookieMonsters from './cookie-monsters'

const init = function init() {
  const allScripts = Array.from(document.querySelectorAll('script'))
  if (!allScripts.length) return

  const hostnames = allScripts.map(({ src }) => getHostname(src)).filter(Boolean)
  const monsterMatch = cookieMonsters.find(({ hostname }) => hostnames.includes(hostname))

  if (!monsterMatch) return

  monsterMatch.handler()
}

init()
