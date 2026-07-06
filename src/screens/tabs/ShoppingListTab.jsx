import { EmptyState } from '../../components/EmptyState'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useStoreMemo } from '../../hooks/useStoreMemo'
import { getShoppingList } from '../../services/dataSource'

export function ShoppingListTab() {
  const stores = useAsyncData(getShoppingList, [])
  const { memos, setMemo } = useStoreMemo()

  if (!stores) return null
  if (stores.length === 0) return <EmptyState message="買い出しリストは登録されていません" />

  return (
    <div className="space-y-4">
      {stores.map((store) => (
        <div key={store.id} className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="font-bold text-teal">{store.name}</h3>
          {store.address && <p className="text-xs text-gray-500">{store.address}</p>}
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            {store.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-2">
                <span>{item.name}</span>
                <span className="shrink-0 text-gray-500">{item.quantity}</span>
              </li>
            ))}
          </ul>
          <textarea
            value={memos[store.id] ?? store.memo ?? ''}
            onChange={(event) => setMemo(store.id, event.target.value)}
            placeholder="メモ"
            rows={2}
            className="mt-3 w-full rounded-lg border border-gray-200 px-2 py-1 text-sm"
          />
        </div>
      ))}
    </div>
  )
}
