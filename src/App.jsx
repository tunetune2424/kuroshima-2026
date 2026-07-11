import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { TimetableScreen } from './screens/TimetableScreen'
import { EventDetailScreen } from './screens/EventDetailScreen'
import { WishlistScreen } from './screens/WishlistScreen'
import { EquipmentScreen } from './screens/EquipmentScreen'
import { MemoScreen } from './screens/MemoScreen'
import { StaffRolesScreen } from './screens/StaffRolesScreen'
import { BackupScreen } from './screens/BackupScreen'
import { GuideScreen } from './screens/GuideScreen'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/timetable" element={<TimetableScreen />} />
        <Route path="/event/:eventId" element={<EventDetailScreen />} />
        <Route path="/wishlist" element={<WishlistScreen />} />
        <Route path="/equipment" element={<EquipmentScreen />} />
        <Route path="/memo" element={<MemoScreen />} />
        <Route path="/staff" element={<StaffRolesScreen />} />
        <Route path="/backup" element={<BackupScreen />} />
        <Route path="/guide" element={<GuideScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default App
