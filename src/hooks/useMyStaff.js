import { useLocalStorage } from './useLocalStorage'

// 「自分は誰か」の設定。設定するとタイムテーブル等で自分の担当がハイライトされる。
export function useMyStaff() {
  const [myStaffId, setMyStaffId] = useLocalStorage('myStaff', null)
  return { myStaffId, setMyStaffId }
}
