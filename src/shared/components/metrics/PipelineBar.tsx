import type { PipelineStage } from "@/shared/types"

export function PipelineBar({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="border border-[#e2ddd7] rounded-lg overflow-hidden bg-white">
      <div
        className="grid divide-x divide-[#e2ddd7]"
        style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
      >
        {stages.map((s) => (
          <div
            key={s.key}
            className={`flex flex-col items-center py-5 gap-1 ${
              s.highlighted ? "bg-[#fef3c7]" : s.blocked ? "bg-[#fff0f0]" : ""
            }`}
          >
            <span
              className={`text-[24px] font-semibold leading-none ${
                s.highlighted
                  ? "text-[#b45309]"
                  : s.blocked
                    ? "text-[#dc2626]"
                    : "text-[#1c1917]"
              }`}
            >
              {s.count}
            </span>
            <span className="text-[10px] tracking-[0.1em] font-medium text-[#a09890] uppercase text-center px-2">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
