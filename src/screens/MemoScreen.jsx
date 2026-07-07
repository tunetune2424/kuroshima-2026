import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { MemoListItem } from '../components/MemoListItem'
import { EmptyState } from '../components/EmptyState'
import { useMemos } from '../hooks/useMemos'

export function MemoScreen() {
  const { memos, add, remove } = useMemos()
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    add(text)
    setText('')
  }

  return (
    <AppShell title="メモ">
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="気づいたことをメモ"
          rows={4}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-coral px-4 py-2 text-sm font-bold text-white"
        >
          追加
        </button>
      </form>

      {memos.length === 0 ? (
        <EmptyState message="メモはまだありません" />
      ) : (
        <div className="space-y-2">
          {memos.map((memo) => (
            <MemoListItem key={memo.id} memo={memo} onDelete={() => remove(memo.id)} />
          ))}
        </div>
      )}
    </AppShell>
  )
}
