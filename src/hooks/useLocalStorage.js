import { useState, useEffect, useCallback } from 'react'

const NAMESPACE = 'kuroshima2026'
// 同じキーを使う複数コンポーネント間で状態を同期させるためのアプリ内イベント
const SYNC_EVENT = 'kuroshima2026-storage'

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

  useEffect(() => {
    const handleSync = (event) => {
      if (event.detail?.key === key) {
        setValue(readValue(key, initialValue))
      }
    }
    window.addEventListener(SYNC_EVENT, handleSync)
    return () => window.removeEventListener(SYNC_EVENT, handleSync)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        try {
          window.localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(resolved))
        } catch {
          // ストレージ書き込み不可（プライベートブラウズ等）は静かに無視する
        }
        queueMicrotask(() => {
          window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }))
        })
        return resolved
      })
    },
    [key],
  )

  return [value, update]
}
