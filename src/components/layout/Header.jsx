import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HamburgerMenu } from './HamburgerMenu'

export function Header({ title }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-teal px-4 py-3 text-white shadow">
      {isHome ? (
        <span className="w-8" />
      ) : (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="戻る"
          className="text-xl leading-none"
        >
          ←
        </button>
      )}
      <h1 className="truncate text-base font-bold">{title}</h1>
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="メニューを開く"
        className="text-xl leading-none"
      >
        ≡
      </button>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
