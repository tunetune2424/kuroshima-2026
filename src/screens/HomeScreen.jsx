import { useMemo } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { NavCard } from '../components/NavCard'
import { CurrentEventCard } from '../components/CurrentEventCard'
import { useAsyncData } from '../hooks/useAsyncData'
import { useNow } from '../hooks/useNow'
import { getTimetable, getStaff } from '../services/dataSource'
import { getCurrentEventStatus } from '../services/eventTime'

export function HomeScreen() {
  const days = useAsyncData(getTimetable, [])
  const staff = useAsyncData(getStaff, [])
  const now = useNow()

  const staffById = useMemo(() => new Map((staff ?? []).map((person) => [person.id, person])), [staff])
  const eventStatus = useMemo(() => {
    if (!days) return null
    return getCurrentEventStatus(days, now)
  }, [days, now])

  return (
    <AppShell title="黒島2026 運営アプリ">
      <div className="space-y-4">
        {eventStatus && (
          <CurrentEventCard
            status={eventStatus.status}
            current={eventStatus.current}
            next={eventStatus.next}
            staffById={staffById}
            now={now}
          />
        )}

        <div className="grid grid-cols-1 gap-3">
          <NavCard to="/timetable" icon="🗓" title="タイムテーブル" subtitle="1日目・2日目・解散日" />
          <NavCard to="/wishlist" icon="✨" title="やりたいことリスト" subtitle="スタッフごとのやりたいこと" />
          <NavCard to="/equipment" icon="🎒" title="備品" subtitle="買い出し・備品確認・在庫" />
          <NavCard to="/memo" icon="📝" title="メモ" subtitle="端末内に保存" />
        </div>
      </div>
    </AppShell>
  )
}
