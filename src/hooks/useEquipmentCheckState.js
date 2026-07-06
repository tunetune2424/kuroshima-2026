import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useEquipmentCheckState() {
  const [state, setState] = useLocalStorage('equipmentCheck', {})

  const toggle = useCallback(
    (itemId) => {
      setState((prev) => ({
        ...prev,
        [itemId]: { checked: !prev[itemId]?.checked, memo: prev[itemId]?.memo ?? '' },
      }))
    },
    [setState],
  )

  const setMemo = useCallback(
    (itemId, memo) => {
      setState((prev) => ({
        ...prev,
        [itemId]: { checked: prev[itemId]?.checked ?? false, memo },
      }))
    },
    [setState],
  )

  return { state, toggle, setMemo }
}
