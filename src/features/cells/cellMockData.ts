import type { PipelineStage, ComplianceItem, MetricCard } from "@/shared/types"

export const cellMeta: Record<
  string,
  {
    id: string
    name: string
    subtitle: string
    clioStatus: string
    region: string
    mode: string
    lastSynced: string
    matters: string
    contacts: string
    activities: string
    revenue: string
  }
> = {
  "cell-001": {
    id: "cell-001",
    name: "Housing Disrepair Cell — Manchester",
    subtitle:
      "Housing disrepair · Manchester, UK · CLIO-MCR-HSG-001 · Last sync 2 mins ago",
    clioStatus: "Connected to Clio (sandbox)",
    region: "EU",
    mode: "Live",
    lastSynced: "25 mins ago",
    matters: "—",
    contacts: "—",
    activities: "—",
    revenue: "—",
  },
  "cell-002": {
    id: "cell-002",
    name: "PCP Cell — Birmingham",
    subtitle:
      "PCP mis-selling · Birmingham, UK · CLIO-BHM-PCP-002 · Last sync 5 mins ago",
    clioStatus: "Connected to Clio (sandbox)",
    region: "EU",
    mode: "Live",
    lastSynced: "5 mins ago",
    matters: "—",
    contacts: "—",
    activities: "—",
    revenue: "—",
  },
}

export const cellMetrics: MetricCard[] = [
  {
    label: "ACTIVE CASES",
    value: "412",
    sub: "↑ 18 this week",
    subPositive: true,
  },
  {
    label: "GROSS RECOVERY",
    value: "£586K",
    sub: "↑ £74K MTD",
    subPositive: true,
  },
  {
    label: "AVG CYCLE TIME",
    value: "71 days",
    sub: "↓ 2 days under target",
    subPositive: true,
  },
  {
    label: "SETTLEMENT RATE",
    value: "71%",
    sub: "↑ +3% this quarter",
    subPositive: true,
  },
]

export const cellPipeline: PipelineStage[] = [
  { key: "intake", label: "INTAKE", count: 52 },
  { key: "letter_of_claim", label: "LETTER OF CLAIM", count: 88 },
  {
    key: "awaiting_response",
    label: "AWAITING RESPONSE",
    count: 74,
    highlighted: true,
  },
  { key: "negotiation", label: "NEGOTIATION", count: 118 },
  { key: "settlement", label: "SETTLEMENT", count: 50 },
  { key: "closed", label: "CLOSED", count: 30 },
]

export const cellCompliance: ComplianceItem[] = [
  { label: "Client ID verified", pct: 99 },
  { label: "Property survey on file", pct: 95 },
  { label: "CFA signed & uploaded", pct: 96 },
  { label: "ATE policy issued (FairShield)", pct: 94 },
  { label: "Letter before action sent", pct: 92 },
  { label: "14-day landlord response logged", pct: 90 },
]

export const cellList = [
  { id: "cell-001", label: "Housing · Manchester" },
  { id: "cell-002", label: "PCP · Birmingham" },
  { id: "cell-003", label: "Data · London" },
  { id: "cell-004", label: "Employment · Leeds" },
  { id: "cell-005", label: "RTA · Glasgow" },
]
