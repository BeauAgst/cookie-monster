import cookieMonsters from './cookie-monsters'

const init = function init() {
  const monsterMatch = cookieMonsters.find(({ rule }) => rule())

  if (!monsterMatch) return

  monsterMatch.handler()
}

init()
