import { useMemo, useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { EmptyState } from '../components/EmptyState'
import { useAsyncData } from '../hooks/useAsyncData'
import { useWishlistState } from '../hooks/useWishlistState'
import { getWishlist, getStaff } from '../services/dataSource'

export function WishlistScreen() {
  const sections = useAsyncData(getWishlist, [])
  const staff = useAsyncData(getStaff, [])
  const { checks, toggle } = useWishlistState()
  const [openSections, setOpenSections] = useState(() => new Set())

  const staffById = useMemo(() => new Map((staff ?? []).map((person) => [person.id, person])), [staff])

  if (!sections) return null

  const toggleSection = (staffId) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(staffId)) next.delete(staffId)
      else next.add(staffId)
      return next
    })
  }

  return (
    <AppShell title="やりたいことリスト">
      {sections.length === 0 && <EmptyState message="やりたいことがまだ登録されていません" />}
      <div className="space-y-3">
        {sections.map((section) => {
          const staffName = staffById.get(section.staffId)?.name ?? section.staffId
          const isOpen = openSections.has(section.staffId)
          const achievedCount = section.items.filter((item) => checks[item.id]).length

          return (
            <div key={section.staffId} className="rounded-2xl bg-white shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(section.staffId)}
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <span className="font-bold text-gray-800">{staffName}</span>
                <span className="text-xs text-gray-500">
                  {achievedCount}/{section.items.length} 達成 {isOpen ? '▲' : '▼'}
                </span>
              </button>
              {isOpen && (
                <ul className="space-y-2 px-4 pb-4">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(checks[item.id])}
                          onChange={() => toggle(item.id)}
                          className="mt-1 h-5 w-5 accent-teal"
                        />
                        <span
                          className={`text-sm text-gray-700 ${checks[item.id] ? 'line-through opacity-60' : ''}`}
                        >
                          {item.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
