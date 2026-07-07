import { useMemo } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { EmptyState } from '../components/EmptyState'
import { CollapsibleSection } from '../components/CollapsibleSection'
import { useAsyncData } from '../hooks/useAsyncData'
import { useWishlistState } from '../hooks/useWishlistState'
import { getWishlist, getStaff } from '../services/dataSource'

export function WishlistScreen() {
  const sections = useAsyncData(getWishlist, [])
  const staff = useAsyncData(getStaff, [])
  const { checks, toggle } = useWishlistState()

  const staffById = useMemo(() => new Map((staff ?? []).map((person) => [person.id, person])), [staff])

  if (!sections) return null

  return (
    <AppShell title="やりたいことリスト">
      {sections.length === 0 && <EmptyState message="やりたいことがまだ登録されていません" />}
      <div className="space-y-3">
        {sections.map((section) => {
          const staffName = staffById.get(section.staffId)?.name ?? section.staffId
          const achievedCount = section.items.filter((item) => checks[item.id]).length

          return (
            <CollapsibleSection
              key={section.staffId}
              title={staffName}
              badge={`${achievedCount}/${section.items.length} 達成`}
            >
              <ul className="space-y-2">
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
            </CollapsibleSection>
          )
        })}
      </div>
    </AppShell>
  )
}
