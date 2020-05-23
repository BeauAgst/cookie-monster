import cookieMonsters from './cookie-monsters'

const init = function init() {
  const monsterMatch = cookieMonsters.find(async ({ rule }) => await rule())

  if (!monsterMatch) return

  monsterMatch.handler()
}

init()
