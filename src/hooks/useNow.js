import { useEffect, useState } from 'react'
import { getEffectiveNow } from '../services/eventTime'

export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => getEffectiveNow())

  useEffect(() => {
    const timer = setInterval(() => setNow(getEffectiveNow()), intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs])

  return now
}
