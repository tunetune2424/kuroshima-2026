import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useEventNotes() {
  const [notes, setNotes] = useLocalStorage('eventNotes', {})

  const setNote = useCallback(
    (eventId, text) => {
      setNotes((prev) => ({ ...prev, [eventId]: text }))
    },
    [setNotes],
  )

  return { notes, setNote }
}
