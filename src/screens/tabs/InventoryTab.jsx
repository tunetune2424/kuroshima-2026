import { EmptyState } from '../../components/EmptyState'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getInventory } from '../../services/dataSource'

export function InventoryTab() {
  const categories = useAsyncData(getInventory, [])

  if (!categories) return null
  if (categories.length === 0) return <EmptyState message="在庫記録が登録されていません" />

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id}>
          <h3 className="mb-2 font-bold text-teal">{category.label}</h3>
          <div className="space-y-2">
            {category.items.map((item) => (
              <div key={item.id} className="rounded-xl bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.quantity}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs text-teal">
                    {item.status}
                  </span>
                  {item.notes && <span className="text-xs text-gray-500">{item.notes}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
