import { AppShell } from '../components/layout/AppShell'
import { StaffCard } from '../components/StaffCard'
import { useAsyncData } from '../hooks/useAsyncData'
import { getStaff } from '../services/dataSource'

export function StaffRolesScreen() {
  const staff = useAsyncData(getStaff, [])

  if (!staff) return null

  return (
    <AppShell title="スタッフ役割">
      <div className="space-y-3">
        {staff.map((person) => (
          <StaffCard key={person.id} staff={person} />
        ))}
      </div>
    </AppShell>
  )
}
