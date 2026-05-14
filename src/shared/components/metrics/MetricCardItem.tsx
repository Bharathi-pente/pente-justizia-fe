import type { MetricCard } from "@/shared/types"

export function MetricCardItem({
  label,
  value,
  sub,
  subPositive,
  subNegative,
}: MetricCard) {
  const subColor = subNegative
    ? "text-[#b45309]"
    : subPositive
      ? "text-[#3d6b1e]"
      : "text-[#a09890]"

  return (
    <div className="flex flex-col gap-1.5 py-5 px-6">
      <p className="text-[10px] font-semibold tracking-[0.12em] text-[#a09890] uppercase">
        {label}
      </p>
      <p className="text-[30px] font-semibold text-[#1c1917] leading-none tracking-tight">
        {value}
      </p>
      <p className={`text-[12px] font-medium ${subColor}`}>{sub}</p>
    </div>
  )
}
