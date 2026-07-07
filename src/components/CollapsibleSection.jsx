import { useState } from 'react'

export function CollapsibleSection({ title, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <span className="font-bold text-gray-800">{title}</span>
        <span className="flex items-center gap-2 text-xs text-gray-500">
          {badge}
          <span>{open ? '▲' : '▼'}</span>
        </span>
      </button>
      {open && <div className="space-y-2 px-4 pb-4">{children}</div>}
    </div>
  )
}
