type StatCardProps = {
  title: string
  value: number
  icon: React.ReactNode
  subtitle?: string
}

export function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-figma">
      {icon}
      <p>{title}</p>
      <p>{value}</p>
      <p>{subtitle}</p>
    </div>
  )
}