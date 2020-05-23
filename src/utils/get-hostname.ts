export default function getHostnameFromString(path: string): string | undefined {
  if (!path) return
  const url = new URL(path)
  return url.hostname
}
