import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { generateId } from '../utils/id'

export function useMemos() {
  const [memos, setMemos] = useLocalStorage('memos', [])

  const add = useCallback(
    (text) => {
      const trimmed = text.trim()
      if (!trimmed) return
      setMemos((prev) => [{ id: generateId('memo'), text: trimmed, createdAt: Date.now() }, ...prev])
    },
    [setMemos],
  )

  const remove = useCallback(
    (id) => {
      setMemos((prev) => prev.filter((memo) => memo.id !== id))
    },
    [setMemos],
  )

  return { memos, add, remove }
}
