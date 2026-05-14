// "use client"

// import { useRouter } from "next/navigation"
// import { RefreshCw } from "lucide-react"
// import { MetricCardItem } from "@/shared/components/metrics/MetricCardItem"
// import { PipelineBar } from "@/shared/components/metrics/PipelineBar"
// import { useClioData } from "@/hook/useClioData"
// import { Skeleton } from "@/components/ui/skeleton"
// import { useSyncCell } from "@/hook/useSyncCell"

// function formatCurrency(value: number): string {
//   if (value >= 1_000_000) return `£${(value / 1_000_000).toFixed(2)}M`
//   if (value >= 1_000) return `£${(value / 1_000).toFixed(0)}K`
//   return `£${value}`
// }

// function formatLastSynced(dateStr: string | null): string {
//   if (!dateStr) return "Never"
//   const diffMs = Date.now() - new Date(dateStr).getTime()
//   const diffMins = Math.floor(diffMs / 60_000)
//   if (diffMins < 1) return "Just now"
//   if (diffMins < 60) return `${diffMins} mins ago`
//   const diffHours = Math.floor(diffMins / 60)
//   if (diffHours < 24) return `${diffHours}h ago`
//   return `${Math.floor(diffHours / 24)}d ago`
// }

// function ClioIntegrationCard({
//   clioStatus,
//   region,
//   mode,
//   lastSynced,
//   totalMatters,
//   totalContacts,
//   totalActivities,
//   grossRecovery,
//   isSyncing, // ← new
//   onSyncNow, // ← new
// }: {
//   clioStatus: string
//   region: string
//   mode: string
//   lastSynced: string
//   totalMatters: number
//   totalContacts: number
//   totalActivities: number
//   grossRecovery: number
//   isSyncing: boolean // ← new
//   onSyncNow: () => void // ← new
// }) {
//   return (
//     <div className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
//       <div className="px-6 py-4 flex items-start justify-between">
//         <div>
//           <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase mb-2">
//             Clio Integration
//           </p>
//           <div className="flex items-center gap-2 mb-1">
//             <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
//             <span className="text-[13px] font-medium text-[#1c1917]">
//               {clioStatus}
//             </span>
//           </div>
//           <p className="text-[12px] text-[#a09890]">
//             Region: {region} · Mode: {mode}
//           </p>
//           <p className="text-[12px] text-[#a09890]">
//             Last synced: {lastSynced}
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {/* ── Sync Now button ── */}
//           <button
//             onClick={onSyncNow}
//             disabled={isSyncing}
//             className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border border-[#e2ddd7] rounded-lg hover:bg-[#f5f3ee] transition-colors text-[#1c1917] disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
//             {isSyncing ? "Syncing…" : "Sync now"}
//           </button>
//           <button className="px-3 py-2 text-[12px] font-medium border border-[#e2ddd7] rounded-lg hover:bg-[#f5f3ee] transition-colors text-[#78716c]">
//             Disconnect
//           </button>
//         </div>
//       </div>

//       {/* Stats row */}
//       <div className="border-t border-[#f0ede8] grid grid-cols-4 divide-x divide-[#f0ede8]">
//         {[
//           { label: "MATTERS", value: totalMatters },
//           { label: "CONTACTS", value: totalContacts },
//           { label: "ACTIVITIES", value: totalActivities },
//           { label: "GROSS RECOVERY", value: formatCurrency(grossRecovery) },
//         ].map((s) => (
//           <div key={s.label} className="px-6 py-3">
//             <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase">
//               {s.label}
//             </p>
//             <p className="text-[18px] font-semibold text-[#1c1917] mt-1">
//               {s.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// function ComplianceList({
//   items,
// }: {
//   items: { label: string; pct: number }[]
// }) {
//   return (
//     <div className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
//       {items.map((item, i) => (
//         <div
//           key={item.label}
//           className={`flex items-center justify-between px-6 py-3.5 ${
//             i < items.length - 1 ? "border-b border-[#f5f3ee]" : ""
//           }`}
//         >
//           <span className="text-[13px] text-[#1c1917]">{item.label}</span>
//           <span
//             className={`px-3 py-1 rounded text-[12px] font-semibold ${
//               item.pct >= 90
//                 ? "bg-[#dcfce7] text-[#166534]"
//                 : "bg-[#fef3c7] text-[#92400e]"
//             }`}
//           >
//             ✓ {item.pct}%
//           </span>
//         </div>
//       ))}
//     </div>
//   )
// }

// export function CellDetailPage({ cellId }: { cellId: string }) {
//   const router = useRouter()
//   const { data, isLoading, isError, error } = useClioData(cellId)
//   const syncMutation = useSyncCell(cellId) // ← add this
//   const matters = data?.matters
//   const financials = data?.financials
//   const sync = data?.sync
//   const contacts = data?.contacts
//   const tasks = data?.tasks
//   const documents = data?.documents
//   const activities = data?.activities
//   const pipeline = data?.pipeline ?? []

//   const lastSynced = sync?.lastSyncedAt
//     ? formatLastSynced(sync.lastSyncedAt)
//     : "Never"

//   return (
//     <div className="flex-1 px-8 py-7 max-w-7xl mx-auto w-full space-y-6">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           {isLoading ? (
//             <div className="space-y-2">
//               <Skeleton className="h-6 w-48" />
//               <Skeleton className="h-4 w-32" />
//             </div>
//           ) : (
//             <>
//               <h1 className="text-[20px] font-semibold text-[#1c1917] tracking-tight">
//                 {data?.cellName ?? cellId}
//               </h1>
//               <p className="text-[12px] text-[#a09890] mt-1">
//                 Last sync: {lastSynced}
//               </p>
//             </>
//           )}
//         </div>
//         <button
//           onClick={() => router.push("/cells")}
//           className="px-3 py-2 text-[13px] border border-[#e2ddd7] rounded-lg bg-white text-[#78716c] hover:bg-[#f5f3ee] transition-colors"
//         >
//           ← All Cells
//         </button>
//       </div>

//       {/* Clio integration card */}
//       {isLoading ? (
//         <Skeleton className="h-36 w-full rounded-xl" />
//       ) : isError ? (
//         <div className="border border-[#fecaca] rounded-xl bg-[#fef2f2] px-6 py-5 text-[13px] text-[#991b1b]">
//           Failed to load cell:{" "}
//           {error instanceof Error ? error.message : "Unknown error"}
//         </div>
//       ) : data ? (
//         <ClioIntegrationCard
//           clioStatus={
//             data.status === "CONNECTED" ? "Connected to Clio" : data.status
//           }
//           region="EU"
//           mode="Live"
//           lastSynced={lastSynced}
//           totalMatters={matters?.total ?? 0}
//           totalContacts={contacts?.total ?? 0}
//           totalActivities={activities?.total ?? 0}
//           grossRecovery={financials?.grossRecovery ?? 0}
//           isSyncing={syncMutation.isPending} // ← add
//           onSyncNow={() => syncMutation.mutate()} // ← add
//         />
//       ) : null}
//       {/* sync error toast — shows below the card if sync fails */}
//       {syncMutation.isError && (
//         <div className="border border-[#fecaca] rounded-lg bg-[#fef2f2] px-5 py-3 text-[12px] text-[#991b1b]">
//           Sync failed:{" "}
//           {syncMutation.error instanceof Error
//             ? syncMutation.error.message
//             : "Unknown error"}
//         </div>
//       )}

//       {/* sync queued confirmation */}
//       {syncMutation.isSuccess && (
//         <div className="border border-[#bbf7d0] rounded-lg bg-[#f0fdf4] px-5 py-3 text-[12px] text-[#166534]">
//           Sync queued — dashboard will refresh shortly
//         </div>
//       )}
//       {/* Metrics */}
//       <div className="border border-[#e2ddd7] rounded-xl bg-[#f5f3ee] overflow-hidden">
//         <div className="grid grid-cols-4 divide-x divide-[#e2ddd7]">
//           {isLoading ? (
//             [...Array(4)].map((_, i) => (
//               <div key={i} className="py-5 px-6 space-y-2">
//                 <Skeleton className="h-3 w-24" />
//                 <Skeleton className="h-8 w-20" />
//                 <Skeleton className="h-3 w-16" />
//               </div>
//             ))
//           ) : matters && financials ? (
//             <>
//               <MetricCardItem
//                 label="ACTIVE CASES"
//                 value={String(matters.open)}
//                 sub={`${matters.total} total`}
//                 subPositive
//               />
//               <MetricCardItem
//                 label="GROSS RECOVERY"
//                 value={formatCurrency(financials.grossRecovery)}
//                 sub={
//                   financials.totalDue > 0
//                     ? `${formatCurrency(financials.totalDue)} outstanding`
//                     : "All collected"
//                 }
//                 subPositive={financials.totalDue === 0}
//                 subNegative={financials.totalDue > 0}
//               />
//               <MetricCardItem
//                 label="AVG CYCLE TIME"
//                 value={
//                   matters.avgCycleDays != null
//                     ? `${matters.avgCycleDays} days`
//                     : "—"
//                 }
//                 sub={
//                   matters.avgCycleDays != null
//                     ? matters.avgCycleDays < 70
//                       ? "↓ under target"
//                       : "↑ over target"
//                     : "No data"
//                 }
//                 subPositive={
//                   matters.avgCycleDays != null && matters.avgCycleDays < 70
//                 }
//                 subNegative={
//                   matters.avgCycleDays != null && matters.avgCycleDays >= 70
//                 }
//               />
//               <MetricCardItem
//                 label="SETTLEMENT RATE"
//                 value={
//                   financials.collectionRate != null
//                     ? `${financials.collectionRate}%`
//                     : "—"
//                 }
//                 sub={
//                   financials.collectionRate != null
//                     ? financials.collectionRate >= 70
//                       ? "↑ above target"
//                       : "↓ below target"
//                     : "No data"
//                 }
//                 subPositive={
//                   financials.collectionRate != null &&
//                   financials.collectionRate >= 70
//                 }
//                 subNegative={
//                   financials.collectionRate != null &&
//                   financials.collectionRate < 70
//                 }
//               />
//             </>
//           ) : null}
//         </div>
//       </div>

//       {/* Case pipeline */}
//       <div className="space-y-3">
//         <h2 className="text-[13px] font-medium text-[#1c1917]">
//           Case pipeline
//         </h2>
//         {isLoading ? (
//           <Skeleton className="h-20 w-full rounded-xl" />
//         ) : pipeline.length > 0 ? (
//           <PipelineBar
//             stages={pipeline.map((s) => ({
//               key: (s.stage ?? "unknown").toLowerCase().replace(/\s+/g, "_"),
//               label: (s.stage ?? "STAGE").toUpperCase(),
//               count: s.count ?? 0,
//             }))}
//           />
//         ) : (
//           <div className="border border-[#e2ddd7] rounded-lg overflow-hidden bg-white">
//             <div
//               className="grid divide-x divide-[#e2ddd7]"
//               style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
//             >
//               {[
//                 "INTAKE",
//                 "LETTER OF CLAIM",
//                 "AWAITING RESPONSE",
//                 "NEGOTIATION",
//                 "SETTLEMENT",
//                 "CLOSED",
//               ].map((label) => (
//                 <div
//                   key={label}
//                   className="flex flex-col items-center py-5 gap-1"
//                 >
//                   <span className="text-[24px] font-semibold leading-none text-[#1c1917]">
//                     —
//                   </span>
//                   <span className="text-[10px] tracking-widest font-medium text-[#a09890] uppercase text-center px-2">
//                     {label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Document & action compliance */}
//       <div className="space-y-3 pb-8">
//         <h2 className="text-[13px] font-medium text-[#1c1917]">
//           Document & action compliance
//         </h2>
//         {isLoading ? (
//           <Skeleton className="h-48 w-full rounded-xl" />
//         ) : (
//           <ComplianceList
//             items={[
//               {
//                 label: "Matters synced",
//                 pct: matters ? Math.round(matters.total > 0 ? 100 : 0) : 0,
//               },
//               {
//                 label: "Bills synced",
//                 pct: financials
//                   ? Math.round(financials.totalBilled > 0 ? 100 : 0)
//                   : 0,
//               },
//               {
//                 label: "Documents on file",
//                 pct: documents ? Math.round(documents.total > 0 ? 100 : 0) : 0,
//               },
//               {
//                 label: "Tasks tracked",
//                 pct: tasks ? Math.round(tasks.total > 0 ? 100 : 0) : 0,
//               },
//               {
//                 label: "Activities logged",
//                 pct: activities
//                   ? Math.round(activities.total > 0 ? 100 : 0)
//                   : 0,
//               },
//             ]}
//           />
//         )}
//       </div>
//       <IntegrationCards />
//     </div>
//   )
// }

// function IntegrationCards() {
//   return (
//     <div className="space-y-3 pb-8">
//       <h2 className="text-[13px] font-medium text-[#1c1917]">
//         External integrations
//       </h2>

//       {/* Cards row */}
//       <div className="grid grid-cols-2 gap-4">
//         {/* 7 Stars Facility */}
//         <div className="border border-[#e2ddd7] rounded-xl bg-white px-6 py-5">
//           <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase mb-3">
//             7 Stars Facility
//           </p>
//           <p className="text-[22px] font-semibold text-[#1c1917] leading-none mb-3">
//             £0 / £0
//           </p>
//           {/* Progress bar */}
//           <div className="w-full h-1.5 bg-[#e2ddd7] rounded-full overflow-hidden mb-2">
//             <div
//               className="h-full rounded-full bg-[#ca8a04]"
//               style={{ width: "0%" }}
//             />
//           </div>
//           <p className="text-[12px] text-[#a09890]">0% drawn · £0 available</p>
//         </div>

//         {/* FairShield ATE */}
//         <div className="border border-[#e2ddd7] rounded-xl bg-white px-6 py-5">
//           <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase mb-3">
//             FairShield ATE
//           </p>
//           <p className="text-[22px] font-semibold text-[#1c1917] leading-none mb-3">
//             0 policies
//           </p>
//           <p className="text-[12px] text-[#a09890]">
//             Cover: £0 total · 0 claims pending
//           </p>
//         </div>
//       </div>

//       {/* Status bar */}
//       <div className="flex items-center gap-5 pt-1">
//         <span className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
//           <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
//           Clio synced
//         </span>
//         <span className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
//           <span className="w-1.5 h-1.5 rounded-full bg-[#a09890]" />
//           FairShield live
//         </span>
//         <span className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
//           <span className="w-1.5 h-1.5 rounded-full bg-[#a09890]" />7 Stars
//           connected
//         </span>
//       </div>
//     </div>
//   )
// }

"use client"

import { useRouter } from "next/navigation"
import { RefreshCw } from "lucide-react"
import { MetricCardItem } from "@/shared/components/metrics/MetricCardItem"
import { PipelineBar } from "@/shared/components/metrics/PipelineBar"
import { useClioData } from "@/hook/useClioData"
import { Skeleton } from "@/components/ui/skeleton"
import { useSyncCell } from "@/hook/useSyncCell"

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `£${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `£${(value / 1_000).toFixed(0)}K`
  return `£${value}`
}

function formatLastSynced(dateStr: string | null): string {
  if (!dateStr) return "Never"
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} mins ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

function mapClioStatus(status: string): string {
  switch (status) {
    case "CONNECTED":
      return "Connected to Clio"
    case "SYNCING":
      return "Sync in progress…"
    case "SYNC_FAILED":
      return "Sync failed"
    case "DISCONNECTED":
      return "Disconnected"
    default:
      return status
  }
}

function statusDotClass(status: string): string {
  switch (status) {
    case "CONNECTED":
      return "bg-[#16a34a]"
    case "SYNCING":
      return "bg-[#ca8a04] animate-pulse"
    case "SYNC_FAILED":
      return "bg-[#dc2626]"
    case "DISCONNECTED":
      return "bg-[#a09890]"
    default:
      return "bg-[#a09890]"
  }
}

function ClioIntegrationCard({
  rawStatus,
  region,
  mode,
  lastSynced,
  totalMatters,
  totalContacts,
  totalActivities,
  grossRecovery,
  isSyncing,
  onSyncNow,
}: {
  rawStatus: string
  region: string
  mode: string
  lastSynced: string
  totalMatters: number
  totalContacts: number
  totalActivities: number
  grossRecovery: number
  isSyncing: boolean
  onSyncNow: () => void
}) {
  const clioStatus = mapClioStatus(rawStatus)
  const dotClass = statusDotClass(isSyncing ? "SYNCING" : rawStatus)

  return (
    <div className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
      <div className="px-6 py-4 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase mb-2">
            Clio Integration
          </p>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${dotClass}`} />
            <span className="text-[13px] font-medium text-[#1c1917]">
              {isSyncing ? "Sync in progress…" : clioStatus}
            </span>
          </div>
          <p className="text-[12px] text-[#a09890]">
            Region: {region} · Mode: {mode}
          </p>
          <p className="text-[12px] text-[#a09890]">
            Last synced: {lastSynced}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSyncNow}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium border border-[#e2ddd7] rounded-lg hover:bg-[#f5f3ee] transition-colors text-[#1c1917] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing…" : "Sync now"}
          </button>
          <button className="px-3 py-2 text-[12px] font-medium border border-[#e2ddd7] rounded-lg hover:bg-[#f5f3ee] transition-colors text-[#78716c]">
            Disconnect
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-t border-[#f0ede8] grid grid-cols-4 divide-x divide-[#f0ede8]">
        {[
          { label: "MATTERS", value: totalMatters },
          { label: "CONTACTS", value: totalContacts },
          { label: "ACTIVITIES", value: totalActivities },
          { label: "GROSS RECOVERY", value: formatCurrency(grossRecovery) },
        ].map((s) => (
          <div key={s.label} className="px-6 py-3">
            <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase">
              {s.label}
            </p>
            <p className="text-[18px] font-semibold text-[#1c1917] mt-1">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComplianceList({
  items,
}: {
  items: { label: string; pct: number }[]
}) {
  return (
    <div className="border border-[#e2ddd7] rounded-xl bg-white overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex items-center justify-between px-6 py-3.5 ${
            i < items.length - 1 ? "border-b border-[#f5f3ee]" : ""
          }`}
        >
          <span className="text-[13px] text-[#1c1917]">{item.label}</span>
          <span
            className={`px-3 py-1 rounded text-[12px] font-semibold ${
              item.pct >= 90
                ? "bg-[#dcfce7] text-[#166534]"
                : "bg-[#fef3c7] text-[#92400e]"
            }`}
          >
            ✓ {item.pct}%
          </span>
        </div>
      ))}
    </div>
  )
}

function IntegrationCards() {
  return (
    <div className="space-y-3 pb-8">
      <h2 className="text-[13px] font-medium text-[#1c1917]">
        External integrations
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* 7 Stars Facility */}
        <div className="border border-[#e2ddd7] rounded-xl bg-white px-6 py-5">
          <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase mb-3">
            7 Stars Facility
          </p>
          <p className="text-[22px] font-semibold text-[#1c1917] leading-none mb-3">
            £0 / £0
          </p>
          <div className="w-full h-1.5 bg-[#e2ddd7] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-[#ca8a04]"
              style={{ width: "0%" }}
            />
          </div>
          <p className="text-[12px] text-[#a09890]">0% drawn · £0 available</p>
        </div>

        {/* FairShield ATE */}
        <div className="border border-[#e2ddd7] rounded-xl bg-white px-6 py-5">
          <p className="text-[10px] font-semibold tracking-widest text-[#a09890] uppercase mb-3">
            FairShield ATE
          </p>
          <p className="text-[22px] font-semibold text-[#1c1917] leading-none mb-3">
            0 policies
          </p>
          <p className="text-[12px] text-[#a09890]">
            Cover: £0 total · 0 claims pending
          </p>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-5 pt-1">
        <span className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
          Clio synced
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a09890]" />
          FairShield live
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-[#a09890]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a09890]" />7 Stars
          connected
        </span>
      </div>
    </div>
  )
}

export function CellDetailPage({ cellId }: { cellId: string }) {
  const router = useRouter()
  const { data, isLoading, isError, error } = useClioData(cellId)
  const syncMutation = useSyncCell(cellId)

  const matters = data?.matters
  const financials = data?.financials
  const sync = data?.sync
  const contacts = data?.contacts
  const tasks = data?.tasks
  const documents = data?.documents
  const activities = data?.activities
  const pipeline = data?.pipeline ?? []

  console.log("Task====>", tasks)
  // isSyncing covers both: mutation pending + backend still running
  const isSyncing = syncMutation.isPending

  // lastSynced now reads from SyncLog.completedAt via the backend fix
  const lastSynced = sync?.lastSyncedAt
    ? formatLastSynced(sync.lastSyncedAt)
    : "Never"

  return (
    <div className="flex-1 px-8 py-7 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : (
            <>
              <h1 className="text-[20px] font-semibold text-[#1c1917] tracking-tight">
                {data?.cellName ?? cellId}
              </h1>
              <p className="text-[12px] text-[#a09890] mt-1">
                Last sync: {isSyncing ? "Syncing now…" : lastSynced}
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => router.push("/cells")}
          className="px-3 py-2 text-[13px] border border-[#e2ddd7] rounded-lg bg-white text-[#78716c] hover:bg-[#f5f3ee] transition-colors"
        >
          ← All Cells
        </button>
      </div>

      {/* Clio integration card */}
      {isLoading ? (
        <Skeleton className="h-36 w-full rounded-xl" />
      ) : isError ? (
        <div className="border border-[#fecaca] rounded-xl bg-[#fef2f2] px-6 py-5 text-[13px] text-[#991b1b]">
          Failed to load cell:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      ) : data ? (
        <ClioIntegrationCard
          rawStatus={data.status}
          region="EU"
          mode="Live"
          lastSynced={isSyncing ? "Syncing now…" : lastSynced}
          totalMatters={matters?.total ?? 0}
          totalContacts={contacts?.total ?? 0}
          totalActivities={activities?.total ?? 0}
          grossRecovery={financials?.grossRecovery ?? 0}
          isSyncing={isSyncing}
          onSyncNow={() => syncMutation.mutate()}
        />
      ) : null}

      {/* Sync banners */}
      {syncMutation.isError && (
        <div className="border border-[#fecaca] rounded-lg bg-[#fef2f2] px-5 py-3 text-[12px] text-[#991b1b]">
          Sync failed:{" "}
          {syncMutation.error instanceof Error
            ? syncMutation.error.message
            : "Unknown error"}
        </div>
      )}
      {syncMutation.isSuccess && !isSyncing && (
        <div className="border border-[#bbf7d0] rounded-lg bg-[#f0fdf4] px-5 py-3 text-[12px] text-[#166534]">
          ✓ Sync complete — dashboard updated
        </div>
      )}

      {/* Metrics */}
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
          ) : matters && financials ? (
            <>
              <MetricCardItem
                label="ACTIVE CASES"
                value={String(matters.open)}
                sub={`${matters.total} total`}
                subPositive
              />
              <MetricCardItem
                label="GROSS RECOVERY"
                value={formatCurrency(financials.grossRecovery)}
                sub={
                  financials.totalDue > 0
                    ? `${formatCurrency(financials.totalDue)} outstanding`
                    : "All collected"
                }
                subPositive={financials.totalDue === 0}
                subNegative={financials.totalDue > 0}
              />
              <MetricCardItem
                label="AVG CYCLE TIME"
                value={
                  matters.avgCycleDays != null
                    ? `${matters.avgCycleDays} days`
                    : "—"
                }
                sub={
                  matters.avgCycleDays != null
                    ? matters.avgCycleDays < 70
                      ? "↓ under target"
                      : "↑ over target"
                    : "No data"
                }
                subPositive={
                  matters.avgCycleDays != null && matters.avgCycleDays < 70
                }
                subNegative={
                  matters.avgCycleDays != null && matters.avgCycleDays >= 70
                }
              />
              <MetricCardItem
                label="SETTLEMENT RATE"
                value={
                  financials.collectionRate != null
                    ? `${financials.collectionRate}%`
                    : "—"
                }
                sub={
                  financials.collectionRate != null
                    ? financials.collectionRate >= 70
                      ? "↑ above target"
                      : "↓ below target"
                    : "No data"
                }
                subPositive={
                  financials.collectionRate != null &&
                  financials.collectionRate >= 70
                }
                subNegative={
                  financials.collectionRate != null &&
                  financials.collectionRate < 70
                }
              />
            </>
          ) : null}
        </div>
      </div>

      {/* Case pipeline */}
      <div className="space-y-3">
        <h2 className="text-[13px] font-medium text-[#1c1917]">
          Case pipeline
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

      {/* Document & action compliance */}
      <div className="space-y-3 pb-8">
        <h2 className="text-[13px] font-medium text-[#1c1917]">
          Document & action compliance
        </h2>
        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-xl" />
        ) : (
          <ComplianceList
            items={[
              {
                label: "Matters synced",
                pct: matters ? Math.round(matters.total > 0 ? 100 : 0) : 0,
              },
              {
                label: "Bills synced",
                pct: financials
                  ? Math.round(financials.totalBilled > 0 ? 100 : 0)
                  : 0,
              },
              {
                label: "Documents on file",
                pct: documents ? Math.round(documents.total > 0 ? 100 : 0) : 0,
              },
              {
                label: "Tasks tracked",
                pct: tasks ? Math.round(tasks.total > 0 ? 100 : 0) : 0,
              },
              {
                label: "Activities logged",
                pct: activities
                  ? Math.round(activities.total > 0 ? 100 : 0)
                  : 0,
              },
            ]}
          />
        )}
      </div>

      {/* External integrations */}
      <IntegrationCards />
    </div>
  )
}
