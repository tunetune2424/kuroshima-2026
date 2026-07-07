const NAMESPACE = 'kuroshima2026'

export function exportBackup() {
  const data = {}
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)
    if (key?.startsWith(`${NAMESPACE}:`)) {
      data[key.slice(NAMESPACE.length + 1)] = JSON.parse(window.localStorage.getItem(key))
    }
  }
  return JSON.stringify(data)
}

export function importBackup(json) {
  const data = JSON.parse(json)
  for (const [key, value] of Object.entries(data)) {
    window.localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value))
  }
}
