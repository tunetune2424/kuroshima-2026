export function MemoListItem({ memo, onDelete }) {
  return (
    <div className="flex items-start justify-between gap-2 rounded-xl bg-white p-3 shadow-sm">
      <div>
        <p className="text-gray-800">{memo.text}</p>
        <p className="mt-1 text-xs text-gray-400">
          {new Date(memo.createdAt).toLocaleString('ja-JP')}
        </p>
      </div>
      <button
        type="button"
        onClick={onDelete}
        aria-label="削除"
        className="shrink-0 text-lg text-gray-400"
      >
        🗑
      </button>
    </div>
  )
}
