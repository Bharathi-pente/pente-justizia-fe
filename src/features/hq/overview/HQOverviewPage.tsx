"use client"

import { useRouter } from "next/navigation"
import { MetricCardItem } from "@/shared/components/metrics/MetricCardItem"
import { PipelineBar } from "@/shared/components/metrics/PipelineBar"
import { StatusBadge } from "@/shared/components/tables/StatusBadge"
import type { CellStatus } from "@/shared/types"
import { useHqOverview } from "@/hook/useHqOverview"
import { Skeleton } from "@/components/ui/skeleton"

function mapCellStatus(apiStatus: string): CellStatus {
  if (apiStatus === "CONNECTED") return "Active"
  if (apiStatus === "SYNC_FAILED" || apiStatus === "DISCONNECTED")
    return "Critical"
  return "At Risk"
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `£${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `£${(value / 1_000).toFixed(0)}K`
  return `£${value}`
}

function formatLastSynced(dateStr: string | null): string {
  if (!dateStr) return "Never"
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} mins ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

// Replace the ComplianceBar component
function ComplianceBar({ pct }: { pct: number | null }) {
  if (pct === null) {
    return <span className="text-[#a09890] text-[13px]">—</span>
  }

  const color =
    pct >= 90 ? "bg-[#1c6b2a]" : pct >= 80 ? "bg-[#ca8a04]" : "bg-[#dc2626]"

  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-1.5 bg-[#e2ddd7] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[12px] text-[#1c1917] font-medium w-8">{pct}%</span>
    </div>
  )
}
function SkeletonTable() {
  return (
    <div className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-5 border-b border-[#f5f3ee] last:border-0"
        >
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}

export function HQOverviewPage() {
  const router = useRouter()
  const { data, isLoading, isError, error } = useHqOverview()

  const summary = data?.summary
  const pipeline = data?.pipeline ?? []
  const cells = data?.cells ?? []

  return (
    <div className="flex-1 px-8 py-7 max-w-7xl mx-auto w-full space-y-7">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1c1917] tracking-tight">
            Justizia command centre
          </h1>
          <p className="text-[12px] text-[#a09890] mt-1">
            {summary ? `${summary.totalCells} cells · ` : "Loading… · "}
            Last sync {summary ? formatLastSynced(summary.lastSyncedAt) : "—"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#166534] text-[12px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            Live data
          </span>
          <button
            onClick={() => router.push("/hq/onboard")}
            className="px-4 py-2 bg-[#1c1917] text-white text-[13px] font-medium rounded-lg hover:bg-[#292524] transition-colors"
          >
            + Onboard Cell
          </button>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="border border-[#e2ddd7] rounded-xl bg-[#f5f3ee] overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-[#e2ddd7]">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="py-5 px-6 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))
          ) : summary ? (
            <>
              <MetricCardItem
                label="ACTIVE CELLS"
                value={String(summary.activeCells)}
                sub={`${summary.totalCells} total`}
                subPositive
              />
              <MetricCardItem
                label="TOTAL CASES"
                value={summary.totalMatters.toLocaleString()}
                sub={`${summary.totalOpenMatters} open`}
                subPositive
              />
              <MetricCardItem
                label="GROSS RECOVERY"
                value={formatCurrency(summary.grossRecovery)}
                sub={
                  summary.totalDue > 0
                    ? `${formatCurrency(summary.totalDue)} outstanding`
                    : "All collected"
                }
                subPositive={summary.totalDue === 0}
                subNegative={summary.totalDue > 0}
              />
              <MetricCardItem
                label="COMPLIANCE SCORE"
                value={cells.length > 0 ? "—" : "—"}
                sub={`${cells.length} connected cells`}
              />
            </>
          ) : null}
        </div>
      </div>

      {/* Pipeline */}
      <div className="space-y-3">
        <h2 className="text-[13px] font-medium text-[#1c1917]">
          Workflow pipeline · All cells
        </h2>
        {isLoading ? (
          <Skeleton className="h-20 w-full rounded-xl" />
        ) : pipeline.length > 0 ? (
          <PipelineBar
            stages={pipeline.map((s) => ({
              key: (s.stage ?? "unknown").toLowerCase().replace(/\s+/g, "_"),
              label: (s.stage ?? "STAGE").toUpperCase(),
              count: s.count ?? 0,
            }))}
          />
        ) : (
          <div className="border border-[#e2ddd7] rounded-lg overflow-hidden bg-white">
            <div
              className="grid divide-x divide-[#e2ddd7]"
              style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
            >
              {[
                "INTAKE",
                "LETTER OF CLAIM",
                "AWAITING RESPONSE",
                "NEGOTIATION",
                "SETTLEMENT",
                "CLOSED",
              ].map((label) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-5 gap-1"
                >
                  <span className="text-[24px] font-semibold leading-none text-[#1c1917]">
                    —
                  </span>
                  <span className="text-[10px] tracking-widest font-medium text-[#a09890] uppercase text-center px-2">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cell performance */}
      <div className="space-y-3">
        <h2 className="text-[13px] font-medium text-[#1c1917]">
          Cell performance
        </h2>
        {isLoading ? (
          <SkeletonTable />
        ) : isError ? (
          <div className="border border-[#fecaca] rounded-xl bg-[#fef2f2] px-6 py-5 text-[13px] text-[#991b1b]">
            Failed to load cells:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        ) : cells.length === 0 ? (
          <div className="border border-[#e2ddd7] rounded-xl bg-white px-6 py-10 text-center text-[13px] text-[#a09890]">
            No connected cells yet. Click &ldquo;+ Onboard Cell&rdquo; to get
            started.
          </div>
        ) : (
          <div className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0ede8]">
                  {[
                    "CELL",
                    "STATUS",
                    "CASES",
                    "RECOVERY",
                    "AVG CYCLE",
                    "DOC COMPLIANCE",
                    "FLAGS",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-semibold tracking-widest text-[#a09890] uppercase px-5 py-3 first:pl-6 last:pr-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f3ee]">
                {cells.map((cell) => {
                  const avgCycle =
                    cell.avgCycleDays != null
                      ? `${cell.avgCycleDays} days`
                      : "—"
                  const recovery = formatCurrency(cell.grossRecovery)
                  return (
                    <tr
                      key={cell.cellId}
                      onClick={() => router.push(`/cells/${cell.cellId}`)}
                      className="hover:bg-[#faf9f7] cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-4 pl-6">
                        <p className="text-[13px] font-medium text-[#1c1917]">
                          {cell.cellName}
                        </p>
                        <p className="text-[10px] text-[#c4bdb6] font-mono mt-0.5">
                          {cell.cellId.substring(0, 12)}…
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={mapCellStatus(cell.status)} />
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#1c1917]">
                        {cell.matters}
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#1c1917]">
                        {recovery}
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#1c1917]">
                        {avgCycle}
                      </td>
                      <td className="px-5 py-4">
                        <ComplianceBar pct={cell.docCompliance ?? null} />
                      </td>
                      <td className="px-5 py-4 pr-6">
                        {cell.overdueTaskCount > 0 ? (
                          <span className="inline-block px-2.5 py-1 rounded-md bg-[#fef3c7] text-[#92400e] text-[11px] font-medium whitespace-nowrap">
                            {cell.overdueTaskCount} overdue
                          </span>
                        ) : (
                          <span className="text-[#a09890]">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
