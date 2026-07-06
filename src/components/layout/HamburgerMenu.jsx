import { Link } from 'react-router-dom'

export function HamburgerMenu({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="メニューを閉じる"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <nav className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-5 flex flex-col gap-2">
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
      </nav>
    </div>
  )
}
