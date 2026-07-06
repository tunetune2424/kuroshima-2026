import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useWishlistState() {
  const [checks, setChecks] = useLocalStorage('wishlist', {})

  const toggle = useCallback(
    (itemId) => {
      setChecks((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
    },
    [setChecks],
  )

  return { checks, toggle }
}
