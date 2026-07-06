export function Tabs({ tabs, activeId, onChange }) {
  return (
    <div className="mb-3 flex gap-1 rounded-xl bg-white p-1 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            activeId === tab.id ? 'bg-teal text-white' : 'text-gray-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
