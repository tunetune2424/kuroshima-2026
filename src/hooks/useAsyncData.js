import { useEffect, useState } from 'react'

// dataSource.js の各getter（Promiseを返す）をscreenから呼ぶための小さなラッパー。
// deps変更時に再取得する。
export function useAsyncData(loader, deps = []) {
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    loader().then((result) => {
      if (!cancelled) setData(result)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return data
}
