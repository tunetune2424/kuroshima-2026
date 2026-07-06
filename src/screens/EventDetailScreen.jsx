import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { StaffBadge } from '../components/StaffBadge'
import { EmptyState } from '../components/EmptyState'
import { useAsyncData } from '../hooks/useAsyncData'
import { getTimetable, getStaff, getEventDetail } from '../services/dataSource'

export function EventDetailScreen() {
  const { eventId } = useParams()
  const days = useAsyncData(getTimetable, [])
  const staff = useAsyncData(getStaff, [])
  const detail = useAsyncData(() => getEventDetail(eventId), [eventId])

  const staffById = useMemo(() => new Map((staff ?? []).map((person) => [person.id, person])), [staff])
  const row = useMemo(() => {
    if (!days) return null
    for (const day of days) {
      const found = day.rows.find((candidate) => candidate.id === eventId)
      if (found) return { ...found, dayLabel: day.label }
    }
    return null
  }, [days, eventId])

  if (!days) return null

  if (!row) {
    return (
      <AppShell title="イベント詳細">
        <EmptyState message="イベントが見つかりませんでした" />
      </AppShell>
    )
  }

  return (
    <AppShell title={row.content}>
      <div className="space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-teal">
            {row.dayLabel}・{row.time}
          </p>
          <h2 className="mt-1 text-lg font-bold text-gray-800">{row.content}</h2>
          {row.assignments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {row.assignments.map((assignment) => (
                <StaffBadge
                  key={`${assignment.staffId}-${assignment.task}`}
                  name={staffById.get(assignment.staffId)?.name ?? assignment.staffId}
                  task={assignment.task}
                />
              ))}
            </div>
          )}
          {row.note && (
            <p className="mt-3 rounded-lg bg-coral/10 p-2 text-sm text-coral">{row.note}</p>
          )}
        </div>

        {detail ? (
          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="font-bold text-teal">注意点</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {detail.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="font-bold text-teal">必要なもの</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {detail.necessaryItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <EmptyState message="このイベントの詳細情報はまだ登録されていません" />
        )}
      </div>
    </AppShell>
  )
}
