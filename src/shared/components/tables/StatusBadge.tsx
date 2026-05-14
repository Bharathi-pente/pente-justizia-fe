import type { CellStatus } from "@/shared/types"

const STATUS_STYLES: Record<CellStatus, string> = {
  Active: "bg-[#dcfce7] text-[#166534]",
  "At Risk": "bg-[#fef9c3] text-[#854d0e]",
  Critical: "bg-[#fee2e2] text-[#991b1b]",
}

const STATUS_DOT: Record<CellStatus, string> = {
  Active: "bg-[#16a34a]",
  "At Risk": "bg-[#ca8a04]",
  Critical: "bg-[#dc2626]",
}

export function StatusBadge({ status }: { status: CellStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  )
}
