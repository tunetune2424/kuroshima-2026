import { Link } from 'react-router-dom'

export function NavCard({ to, icon, title, subtitle }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm active:scale-[0.98] transition-transform"
    >
      <span className="text-2xl">{icon}</span>
      <span className="flex flex-col">
        <span className="font-bold text-gray-800">{title}</span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </span>
    </Link>
  )
}
