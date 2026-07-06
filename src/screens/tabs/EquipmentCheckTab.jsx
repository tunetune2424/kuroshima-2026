import { EmptyState } from '../../components/EmptyState'
import { ChecklistItem } from '../../components/ChecklistItem'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useEquipmentCheckState } from '../../hooks/useEquipmentCheckState'
import { getEquipmentCheck } from '../../services/dataSource'

export function EquipmentCheckTab() {
  const categories = useAsyncData(getEquipmentCheck, [])
  const { state, toggle, setMemo } = useEquipmentCheckState()

  if (!categories) return null
  if (categories.length === 0) return <EmptyState message="備品カテゴリが登録されていません" />

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id}>
          <h3 className="mb-2 font-bold text-teal">{category.label}</h3>
          <div className="space-y-2">
            {category.items.map((item) => (
              <ChecklistItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                notes={item.notes}
                checked={Boolean(state[item.id]?.checked)}
                onToggle={() => toggle(item.id)}
                memo={state[item.id]?.memo ?? ''}
                onMemoChange={(text) => setMemo(item.id, text)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
