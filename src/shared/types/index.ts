export type CellStatus = "Active" | "At Risk" | "Critical"

export interface PipelineStage {
  key: string
  label: string
  count: number
  highlighted?: boolean
  blocked?: boolean
}

export interface CellRow {
  id: string
  name: string
  subtitle: string
  location: string
  clioId: string
  status: CellStatus
  cases: number
  recovery: string
  avgCycle: string
  docCompliance: number
  flags: string | null
}

export interface MetricCard {
  label: string
  value: string
  sub: string
  subPositive?: boolean
  subNegative?: boolean
}

export interface ComplianceItem {
  label: string
  pct: number
}

export interface ComplianceItem {
  label: string
  pct: number
}
