export interface ClioData {
  clioConnected: boolean
  lastSynced: string
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
  data: ClioData
}

export type TabId =
  | "hq-overview"
  | "cell"
  | "workflow-engine"
  | "compliance-audit"
  | "insight-iq"
  | "site-visits"
  | "insurer"
  | "financier"

export interface Tab {
  id: TabId
  label: string
}
