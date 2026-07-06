import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { Tabs } from '../components/Tabs'
import { ShoppingListTab } from './tabs/ShoppingListTab'
import { EquipmentCheckTab } from './tabs/EquipmentCheckTab'
import { InventoryTab } from './tabs/InventoryTab'

const TABS = [
  { id: 'shopping', label: '買い出し' },
  { id: 'check', label: '備品確認' },
  { id: 'inventory', label: '在庫記録' },
]

export function EquipmentScreen() {
  const [activeTab, setActiveTab] = useState('shopping')

  return (
    <AppShell title="備品">
      <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'shopping' && <ShoppingListTab />}
      {activeTab === 'check' && <EquipmentCheckTab />}
      {activeTab === 'inventory' && <InventoryTab />}
    </AppShell>
  )
}
