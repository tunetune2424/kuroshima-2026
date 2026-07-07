import { EVENT_START_DATETIME, DAY_OFFSETS, DEV_TIME_OVERRIDE } from '../config/eventConfig'
import { parseLeadingTime } from '../utils/time'

export function getEffectiveNow() {
  return DEV_TIME_OVERRIDE ? new Date(DEV_TIME_OVERRIDE) : new Date()
}

function rowDateTime(dayId, row) {
  if (row.date) return new Date(row.date)
  const parsed = parseLeadingTime(row.time)
  if (!parsed) return null
  const base = new Date(EVENT_START_DATETIME)
  base.setDate(base.getDate() + (DAY_OFFSETS[dayId] ?? 0))
  base.setHours(parsed.hours, parsed.minutes, 0, 0)
  return base
}

// タイムテーブル全体をフラットにして各行へ絶対日時を付与する。
// time文字列がパースできない行（"↓" 等）はdatetime: nullのまま返す（現在判定には使わない）。
function buildFlatSchedule(days) {
  return days.flatMap((day) =>
    day.rows.map((row) => ({
      ...row,
      dayId: day.dayId,
      dayLabel: day.label,
      datetime: rowDateTime(day.dayId, row),
    })),
  )
}

// 指定スタッフが担当に含まれる、now以降で最初のイベント行を返す（なければnull）。
export function getNextAssignmentFor(days, staffId, now = getEffectiveNow()) {
  if (!staffId) return null
  const flat = buildFlatSchedule(days).filter((row) => row.datetime)
  flat.sort((a, b) => a.datetime - b.datetime)
  return (
    flat.find(
      (row) =>
        row.datetime > now &&
        row.assignments.some((assignment) => assignment.staffId === staffId),
    ) ?? null
  )
}

// 現在時刻から「現在のイベント」「次のイベント」を判定する。
// 戻り値の状態: 'before'（開催前）/ 'during'（開催中）/ 'after'（全日程終了後）
export function getCurrentEventStatus(days, now = getEffectiveNow()) {
  const flat = buildFlatSchedule(days).filter((row) => row.datetime)
  flat.sort((a, b) => a.datetime - b.datetime)

  if (flat.length === 0) return { status: 'before', current: null, next: null }

  if (now < flat[0].datetime) {
    return { status: 'before', current: null, next: flat[0] }
  }

  let current = flat[0]
  let next = null
  for (let i = 0; i < flat.length; i += 1) {
    if (flat[i].datetime <= now) {
      current = flat[i]
      next = flat[i + 1] ?? null
    }
  }

  if (!next) {
    return { status: 'after', current, next: null }
  }

  return { status: 'during', current, next }
}
