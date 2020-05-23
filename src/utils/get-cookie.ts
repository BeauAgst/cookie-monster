export default function getCookie(name: string): string {
  return document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => cookie.substring(0, name.length + 1) === `${name}=`)
    .map(cookie => decodeURIComponent(cookie.substring(name.length + 1)))[0]
}
