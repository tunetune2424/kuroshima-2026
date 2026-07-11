import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { NavCard } from '../components/NavCard'
import { CurrentEventCard } from '../components/CurrentEventCard'
import { useAsyncData } from '../hooks/useAsyncData'
import { useNow } from '../hooks/useNow'
import { useMyStaff } from '../hooks/useMyStaff'
import { getTimetable, getStaff } from '../services/dataSource'
import { getCurrentEventStatus, getNextAssignmentFor } from '../services/eventTime'
import { formatCountdown } from '../utils/time'

export function HomeScreen() {
  const days = useAsyncData(getTimetable, [])
  const staff = useAsyncData(getStaff, [])
  const now = useNow()
  const { myStaffId } = useMyStaff()

  const staffById = useMemo(() => new Map((staff ?? []).map((person) => [person.id, person])), [staff])
  const eventStatus = useMemo(() => {
    if (!days) return null
    return getCurrentEventStatus(days, now)
  }, [days, now])

  const nextMyAssignment = useMemo(() => {
    if (!days || !myStaffId) return null
    return getNextAssignmentFor(days, myStaffId, now)
  }, [days, myStaffId, now])

  const myTask = nextMyAssignment?.assignments.find(
    (assignment) => assignment.staffId === myStaffId,
  )?.task

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
            myStaffId={myStaffId}
          />
        )}

        {myStaffId ? (
          nextMyAssignment && (
            <Link
              to={`/event/${nextMyAssignment.id}`}
              className="block rounded-2xl bg-coral p-4 text-white shadow-sm active:scale-[0.98] transition-transform"
            >
              <p className="text-xs opacity-90">
                次のあなたの出番（{staffById.get(myStaffId)?.name}）
              </p>
              <p className="mt-1 font-bold">
                {nextMyAssignment.dayLabel} {nextMyAssignment.time}｜{nextMyAssignment.content}
              </p>
              <p className="mt-1 text-sm">
                {myTask}（{formatCountdown(nextMyAssignment.datetime - now)}）
              </p>
            </Link>
          )
        ) : (
          <p className="rounded-xl bg-white/60 px-4 py-2 text-center text-xs text-gray-500">
            ≡メニューから自分の名前を設定すると、自分の出番が表示されます
          </p>
        )}

        <div className="grid grid-cols-1 gap-3">
          <NavCard to="/timetable" icon="🗓" title="タイムテーブル" subtitle="1日目・2日目・解散日" />
          <NavCard to="/guide" icon="🛟" title="安全・運営ガイド" subtitle="役割・緊急連絡・安全対応" />
          <NavCard to="/wishlist" icon="✨" title="やりたいことリスト" subtitle="スタッフごとのやりたいこと" />
          <NavCard to="/equipment" icon="🎒" title="備品" subtitle="買い出し・備品確認・在庫" />
          <NavCard to="/memo" icon="📝" title="メモ" subtitle="端末内に保存" />
        </div>
      </div>
    </AppShell>
  )
}
