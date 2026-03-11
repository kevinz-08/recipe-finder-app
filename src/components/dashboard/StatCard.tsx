import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  change: string;
  icon: LucideIcon;
  bgColor: string;
  iconBg: string;
  iconColor: string;
};

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  bgColor,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm border border-white/40 ${bgColor}`}
    >
      {/* icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}
      >
        <Icon className={`${iconColor}`} size={20} />
      </div>

      {/* title */}
      <p className="text-sm text-gray-600 mb-1">{title}</p>

      {/* value */}
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>

      {/* change */}
      <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
        <TrendingUp size={14} className="text-green-500" />
        <span>{change}</span>
      </div>
    </div>
  );
}