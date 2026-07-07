import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useShoppingCheckState() {
  const [checks, setChecks] = useLocalStorage('shoppingCheck', {})

  const toggle = useCallback(
    (itemId) => {
      setChecks((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
    },
    [setChecks],
  )

  return { checks, toggle }
}
