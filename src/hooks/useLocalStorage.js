import { useState, useCallback } from 'react'

const NAMESPACE = 'kuroshima2026'

function readValue(key, initialValue) {
  try {
    const raw = window.localStorage.getItem(`${NAMESPACE}:${key}`)
    return raw ? JSON.parse(raw) : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        try {
          window.localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(resolved))
        } catch {
          // ストレージ書き込み不可（プライベートブラウズ等）は静かに無視する
        }
        return resolved
      })
    },
    [key],
  )

  return [value, update]
}
