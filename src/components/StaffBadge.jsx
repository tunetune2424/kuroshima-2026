export function StaffBadge({ name, task }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-1 text-xs text-teal">
      <span className="font-bold">{name}</span>
      <span className="text-gray-600">{task}</span>
    </span>
  )
}
