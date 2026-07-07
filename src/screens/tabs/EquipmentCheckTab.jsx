import { EmptyState } from '../../components/EmptyState'
import { ChecklistItem } from '../../components/ChecklistItem'
import { CollapsibleSection } from '../../components/CollapsibleSection'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useEquipmentCheckState } from '../../hooks/useEquipmentCheckState'
import { getEquipmentCheck } from '../../services/dataSource'

export function EquipmentCheckTab() {
  const categories = useAsyncData(getEquipmentCheck, [])
  const { state, toggle, setMemo } = useEquipmentCheckState()

  if (!categories) return null
  if (categories.length === 0) return <EmptyState message="備品カテゴリが登録されていません" />

  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const checkedCount = category.items.filter((item) => state[item.id]?.checked).length

        return (
          <CollapsibleSection
            key={category.id}
            title={category.label}
            badge={`${checkedCount}/${category.items.length}`}
          >
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
          </CollapsibleSection>
        )
      })}
    </div>
  )
}
