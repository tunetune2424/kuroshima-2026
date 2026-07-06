export function StaffCard({ staff }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-gray-800">{staff.name}</h2>
        <span className="text-xs text-teal">{staff.mainRole}</span>
      </div>
      <div className="mt-3 space-y-2 text-sm">
        <div>
          <p className="font-semibold text-teal">強み</p>
          <ul className="list-disc pl-5 text-gray-600">
            {staff.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-coral">注意</p>
          <ul className="list-disc pl-5 text-gray-600">
            {staff.cautions.map((caution) => (
              <li key={caution}>{caution}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
