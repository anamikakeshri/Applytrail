export default function StatsStrip({ applications }) {
  const total = applications.length
  const applied = applications.filter((a) => a.status !== 'Saved').length
  const interviews = applications.filter(
    (a) => a.status === 'Interview' || a.status === 'Offer'
  ).length
  const responded = applications.filter(
    (a) =>
      a.status === 'Interview' ||
      a.status === 'Offer' ||
      a.status === 'Rejected'
  ).length
  const responseRate = applied === 0 ? 0 : Math.round((responded / applied) * 100)

  const stats = [
    { label: 'Total', value: total },
    { label: 'Applied', value: applied },
    { label: 'Interviews', value: interviews },
    { label: 'Response rate', value: `${responseRate}%` },
  ]

  return (
    <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <dt className="text-sm text-slate-500">{s.label}</dt>
          <dd className="mt-1 text-2xl font-bold text-slate-900">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}