// ─────────────────────────────────────────────────────────────────────────────
// CELL DASHBOARD (GET /cells/:cellId/dashboard)
// ─────────────────────────────────────────────────────────────────────────────

export interface CellSyncEntityStatus {
  entity: string
  status: string
  lastRun: string | null
  recordsUpserted: number
}

export interface CellSyncStatus {
  lastSyncedAt: string | null
  entityStatuses: CellSyncEntityStatus[]
}

export interface CellMatterStage {
  stage: string
  count: number
}

export interface CellMatterMetrics {
  total: number
  open: number
  closed: number
  pending: number
  byStage: CellMatterStage[]
  avgCycleDays: number | null
}

export interface CellFinancials {
  grossRecovery: number
  totalBilled: number
  totalPaid: number
  totalDue: number
  collectionRate: number | null
}

export interface CellTaskMetrics {
  total: number
  incomplete: number
  overdue: number
}

export interface CellDashboardData {
  cellId: string
  cellName: string
  status: string
  sync: CellSyncStatus
  matters: CellMatterMetrics
  financials: CellFinancials
  contacts: { total: number }
  tasks: CellTaskMetrics
  documents: { total: number }
  activities: { total: number }
  pipeline: CellMatterStage[]
}

// ─────────────────────────────────────────────────────────────────────────────
// HQ OVERVIEW (GET /hq/overview)
// ─────────────────────────────────────────────────────────────────────────────

export interface HqCellRow {
  cellId: string
  cellName: string
  status: string
  matters: number
  openMatters: number
  grossRecovery: number
  totalDue: number
  overdueTaskCount: number
  documentCount: number
  avgCycleDays: number | null
  lastSyncedAt: string | null
}

export interface HqSummary {
  activeCells: number
  totalCells: number
  totalMatters: number
  totalOpenMatters: number
  grossRecovery: number
  totalDue: number
  lastSyncedAt: string | null
}

export interface HqPipelineStage {
  stage: string
  count: number
}

export interface HqOverviewData {
  summary: HqSummary
  pipeline: HqPipelineStage[]
  cells: HqCellRow[]
}

// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────

export interface OnboardRequest {
  name: string
}

export interface OnboardResponse {
  cellId: string
  name: string
  status: string
  authUrl: string
  isResumed: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardData {
  clioConnected: boolean
  lastSynced: string | null
  matters: number
  contacts: number
  activities: number
  revenue: number
  activeCases: number
  grossRecovery: number
  avgCycleTimeDays: number
  docCompliance: number | null
}

export interface DashboardApiResponse {
  success: boolean
  data: DashboardData
}

// ─────────────────────────────────────────────────────────────────────────────
// MATTERS
// ─────────────────────────────────────────────────────────────────────────────

export interface Matter {
  cellId: string
  clioMatterId: string
  title: string
  status: string
  stage: string | null
  description: string | null
  clientName: string | null
  practiceArea: string | null
  openDate: string | null
  closeDate: string | null
  value: number
  syncedAt: string
}

export interface MattersResponse {
  success: boolean
  cellId: string
  count: number
  data: Matter[]
}

export interface SyncResponse {
  success: boolean
  message: string
  cellId: string
  syncedAt: string
  mattersCount: number
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACTS
// ─────────────────────────────────────────────────────────────────────────────

export interface ClioContact {
  id: number
  name: string
  type: string
  created_at: string
  email_addresses: { address: string; name: string; primary: boolean }[]
  phone_numbers: { number: string; name: string; primary: boolean }[]
}

export interface ContactsResponse {
  success: boolean
  total: number
  count: number
  data: ClioContact[]
}

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN
// ─────────────────────────────────────────────────────────────────────────────

export interface TokenStatusResponse {
  connected: boolean
  message?: string
  cellId?: string
  expiresAt?: string
  isExpired?: boolean
  lastUpdated?: string
  accessToken?: string
  refreshToken?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// REGIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface ClioRegion {
  key: string
  flag: string
  label: string
  url: string
}

export const CLIO_REGIONS: ClioRegion[] = [
  { key: "us", flag: "🇺🇸", label: "United States", url: "app.clio.com" },
  {
    key: "eu",
    flag: "🇬🇧",
    label: "United Kingdom / Europe",
    url: "eu.app.clio.com",
  },
  { key: "ca", flag: "🇨🇦", label: "Canada", url: "ca.app.clio.com" },
  { key: "au", flag: "🇦🇺", label: "Australia", url: "au.app.clio.com" },
]

export interface PipelineStages {
  INTAKE: number
  LETTER_OF_CLAIM: number
  AWAITING_RESPONSE: number
  NEGOTIATION: number
  SETTLEMENT: number
  CLOSED: number
}

