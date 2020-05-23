import cookieLawHandler from './cookie-law'
import quantcastHandler from './quantcast'

export default [
  {
    hostname: 'cdn.cookielaw.org',
    handler: cookieLawHandler,
  },
  {
    hostname: 'quantcast.mgr.consensu.org',
    handler: quantcastHandler,
  },
]
