import { Link } from 'react-router-dom'
import { formatCountdown } from '../utils/time'

export function CurrentEventCard({ status, current, next, staffById, now, myStaffId }) {
  if (status === 'before') {
    return (
      <div className="rounded-2xl bg-teal p-4 text-white shadow-sm">
        <p className="text-sm opacity-80">イベント開始前</p>
        {next && (
          <p className="mt-1 font-bold">
            最初のイベントまで {formatCountdown(next.datetime - now)}
          </p>
        )}
      </div>
    )
  }

  if (status === 'after') {
    return (
      <div className="rounded-2xl bg-teal p-4 text-white shadow-sm">
        <p className="font-bold">全日程終了・お疲れさまでした</p>
      </div>
    )
  }

  return (
    <Link
      to={`/event/${current.id}`}
      className="block rounded-2xl bg-teal p-4 text-white shadow-sm active:scale-[0.98] transition-transform"
    >
      <p className="text-sm opacity-80">{current.dayLabel}・現在のイベント</p>
      <p className="mt-1 text-lg font-bold">{current.content}</p>
      {current.assignments.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {current.assignments.map((assignment) => {
            const name = staffById.get(assignment.staffId)?.name ?? assignment.staffId
            const isMe = assignment.staffId === myStaffId
            return (
              <span
                key={`${assignment.staffId}-${assignment.task}`}
                className={`rounded-full px-2 py-1 text-xs ${
                  isMe ? 'bg-coral font-bold text-white' : 'bg-white/15'
                }`}
              >
                {name}：{assignment.task}
              </span>
            )
          })}
        </div>
      )}
      {next && (
        <p className="mt-3 text-xs opacity-90">
          次：{next.content}（{formatCountdown(next.datetime - now)}）
        </p>
      )}
    </Link>
  )
}
