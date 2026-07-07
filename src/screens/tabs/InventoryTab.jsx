import { EmptyState } from '../../components/EmptyState'
import { CollapsibleSection } from '../../components/CollapsibleSection'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useInventoryState } from '../../hooks/useInventoryState'
import { getInventory } from '../../services/dataSource'

export function InventoryTab() {
  const categories = useAsyncData(getInventory, [])
  const { overrides, setField } = useInventoryState()

  if (!categories) return null
  if (categories.length === 0) return <EmptyState message="在庫記録が登録されていません" />

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <CollapsibleSection key={category.id} title={category.label} badge={`${category.items.length}件`}>
          {category.items.map((item) => {
            const current = { quantity: item.quantity, status: item.status, notes: item.notes, ...overrides[item.id] }

            return (
              <div key={item.id} className="rounded-xl bg-sand/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <input
                    type="text"
                    value={current.quantity}
                    onChange={(event) => setField(item.id, 'quantity', event.target.value, item)}
                    className="w-24 shrink-0 rounded-lg border border-gray-200 px-2 py-1 text-right text-sm"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={current.status}
                    onChange={(event) => setField(item.id, 'status', event.target.value, item)}
                    className="w-28 shrink-0 rounded-full border border-teal/30 bg-teal/5 px-2 py-1 text-xs text-teal"
                  />
                  <input
                    type="text"
                    value={current.notes}
                    onChange={(event) => setField(item.id, 'notes', event.target.value, item)}
                    placeholder="メモ"
                    className="flex-1 rounded-lg border border-gray-200 px-2 py-1 text-xs"
                  />
                </div>
              </div>
            )
          })}
        </CollapsibleSection>
      ))}
    </div>
  )
}
