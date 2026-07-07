import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

// 在庫記録の実測値（数量・状態・メモ）。初期値はカタログ（inventory.json）の値で、
// 一度でも編集された品目だけこのオーバーレイが優先される。
export function useInventoryState() {
  const [overrides, setOverrides] = useLocalStorage('inventory', {})

  const setField = useCallback(
    (itemId, field, value, fallback) => {
      setOverrides((prev) => ({
        ...prev,
        [itemId]: {
          quantity: fallback.quantity,
          status: fallback.status,
          notes: fallback.notes,
          ...prev[itemId],
          [field]: value,
        },
      }))
    },
    [setOverrides],
  )

  return { overrides, setField }
}
