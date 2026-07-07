import { Link } from 'react-router-dom'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useMyStaff } from '../../hooks/useMyStaff'
import { getStaff } from '../../services/dataSource'

export function HamburgerMenu({ open, onClose }) {
  const staff = useAsyncData(getStaff, [])
  const { myStaffId, setMyStaffId } = useMyStaff()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="メニューを閉じる"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <nav className="absolute right-0 top-0 h-full w-64 overflow-y-auto bg-white shadow-xl p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-teal">メニュー</span>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-500"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>
        <Link
          to="/"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-gray-700 hover:bg-sand"
        >
          ホーム
        </Link>
        <Link
          to="/staff"
          onClick={onClose}
          className="rounded-lg px-3 py-2 font-semibold text-teal hover:bg-sand"
        >
          スタッフ役割
        </Link>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="mb-2 px-3 text-xs font-semibold text-gray-500">
            自分の担当（選ぶと自分の出番が強調されます）
          </p>
          <div className="flex flex-col gap-1">
            {(staff ?? []).map((person) => (
              <button
                key={person.id}
                type="button"
                onClick={() => setMyStaffId(person.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm ${
                  myStaffId === person.id
                    ? 'bg-teal font-bold text-white'
                    : 'text-gray-700 hover:bg-sand'
                }`}
              >
                {person.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMyStaffId(null)}
              className={`rounded-lg px-3 py-2 text-left text-sm ${
                myStaffId === null ? 'bg-gray-200 font-bold text-gray-600' : 'text-gray-500 hover:bg-sand'
              }`}
            >
              設定しない
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
