import { useMemo, useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { Tabs } from '../components/Tabs'
import { TimetableRow } from '../components/TimetableRow'
import { EmptyState } from '../components/EmptyState'
import { useAsyncData } from '../hooks/useAsyncData'
import { useNow } from '../hooks/useNow'
import { getTimetable, getStaff } from '../services/dataSource'
import { getCurrentEventStatus } from '../services/eventTime'

export function TimetableScreen() {
  const days = useAsyncData(getTimetable, [])
  const staff = useAsyncData(getStaff, [])
  const now = useNow()
  const [activeDay, setActiveDay] = useState('day1')

  const staffById = useMemo(() => new Map((staff ?? []).map((person) => [person.id, person])), [staff])
  const currentEvent = useMemo(() => {
    if (!days) return null
    return getCurrentEventStatus(days, now).current
  }, [days, now])

  if (!days) return null

  const tabs = days.map((day) => ({ id: day.dayId, label: day.label }))
  const activeRows = days.find((day) => day.dayId === activeDay)?.rows ?? []

  return (
    <AppShell title="タイムテーブル">
      <Tabs tabs={tabs} activeId={activeDay} onChange={setActiveDay} />
      <div className="space-y-2">
        {activeRows.length === 0 && <EmptyState message="この日のイベントはまだありません" />}
        {activeRows.map((row) => (
          <TimetableRow
            key={row.id}
            row={row}
            staffById={staffById}
            isCurrent={currentEvent?.id === row.id}
          />
        ))}
      </div>
    </AppShell>
  )
}
