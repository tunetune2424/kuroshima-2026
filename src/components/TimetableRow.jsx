import { Link } from 'react-router-dom'
import { StaffBadge } from './StaffBadge'

export function TimetableRow({ row, staffById, isCurrent, myStaffId }) {
  const hasMyAssignment = Boolean(
    myStaffId && row.assignments.some((assignment) => assignment.staffId === myStaffId),
  )

  return (
    <Link
      to={`/event/${row.id}`}
      className={`block rounded-xl border p-3 shadow-sm transition-colors ${
        isCurrent ? 'border-coral bg-coral/10' : 'border-transparent bg-white'
      } ${hasMyAssignment && !isCurrent ? 'border-l-4 border-l-coral/60' : ''}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-teal">{row.time}</span>
        {row.important && (
          <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-white">★</span>
        )}
      </div>
      <p className="mt-1 font-semibold text-gray-800">{row.content}</p>
      {row.assignments.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {row.assignments.map((assignment) => (
            <StaffBadge
              key={`${assignment.staffId}-${assignment.task}`}
              name={staffById.get(assignment.staffId)?.name ?? assignment.staffId}
              task={assignment.task}
              isMe={assignment.staffId === myStaffId}
            />
          ))}
        </div>
      )}
    </Link>
  )
}
