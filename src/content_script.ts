import cookieMonsters from './cookie-monsters'
import asyncFind from './utils/async-find'
import delay from './utils/delay'

interface Monster {
  name: string
  rule: () => Promise<boolean>
  handler: () => Promise<void>
}

const init = async function init() {
  await delay(500)
  const monsterMatch = (await asyncFind(
    cookieMonsters,
    async (monster: Monster): Promise<boolean> => monster.rule()
  )) as Monster

  if (!monsterMatch) return

  await monsterMatch.handler()
}

init()
