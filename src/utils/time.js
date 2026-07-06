// "9:30" "9:45-10:15" "16:00まで" 等の表記から先頭のHH:mmだけを取り出す。
// パースできない表記（"↓" "就寝前" 等）はnullを返す。
export function parseLeadingTime(timeText) {
  const match = /^(\d{1,2}):(\d{2})/.exec(timeText ?? '')
  if (!match) return null
  return { hours: Number(match[1]), minutes: Number(match[2]) }
}

export function formatCountdown(ms) {
  if (ms <= 0) return 'まもなく'
  const totalMinutes = Math.floor(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours > 0) return `あと${hours}時間${minutes}分`
  return `あと${minutes}分`
}

export function formatClock(date) {
  return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
}
