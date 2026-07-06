export function ChecklistItem({ name, quantity, notes, checked, onToggle, memo, onMemoChange }) {
  return (
    <div className={`rounded-xl border p-3 ${checked ? 'border-teal/40 bg-teal/5' : 'border-transparent bg-white'}`}>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1 h-5 w-5 accent-teal"
        />
        <span className="flex-1">
          <span className={`font-semibold text-gray-800 ${checked ? 'line-through opacity-60' : ''}`}>
            {name}
          </span>
          {quantity && <span className="ml-2 text-xs text-gray-500">×{quantity}</span>}
          {notes && <p className="text-xs text-gray-500">{notes}</p>}
        </span>
      </label>
      {onMemoChange && (
        <input
          type="text"
          value={memo}
          onChange={(event) => onMemoChange(event.target.value)}
          placeholder="状態メモ"
          className="mt-2 w-full rounded-lg border border-gray-200 px-2 py-1 text-sm"
        />
      )}
    </div>
  )
}
