export function StaffBadge({ name, task, isMe = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
        isMe ? 'bg-coral/15 text-coral ring-1 ring-coral/40' : 'bg-teal/10 text-teal'
      }`}
    >
      <span className="font-bold">{name}</span>
      <span className={isMe ? 'font-semibold text-coral/80' : 'text-gray-600'}>{task}</span>
    </span>
  )
}
