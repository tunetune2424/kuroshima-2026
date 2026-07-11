import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { EmptyState } from '../components/EmptyState'
import { useAsyncData } from '../hooks/useAsyncData'
import { getGuide } from '../services/dataSource'

export function GuideScreen() {
  const sections = useAsyncData(getGuide, [])
  const [openSections, setOpenSections] = useState(() => new Set())

  if (!sections) return null

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <AppShell title="安全・運営ガイド">
      {sections.length === 0 && <EmptyState message="ガイドはまだ登録されていません" />}
      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = openSections.has(section.id)
          return (
            <div key={section.id} className="rounded-2xl bg-white shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <span className="font-bold text-gray-800">{section.title}</span>
                <span className="text-xs text-gray-500">{isOpen ? '▲' : '▼'}</span>
              </button>
              {isOpen && (
                <ul className="list-disc space-y-2 px-4 pb-4 pl-8 text-sm text-gray-700 marker:text-coral">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
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
