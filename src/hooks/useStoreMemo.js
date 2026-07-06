import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

// 買い出しリストの店舗別メモ（静的データのmemo初期値を上書きする永続化レイヤー）
export function useStoreMemo() {
  const [memos, setMemos] = useLocalStorage('storeMemos', {})

  const setMemo = useCallback(
    (storeId, text) => {
      setMemos((prev) => ({ ...prev, [storeId]: text }))
    },
    [setMemos],
  )

  return { memos, setMemo }
}
