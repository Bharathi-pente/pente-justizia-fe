import api from "@/lib/api"
import type {
  OnboardRequest,
  OnboardResponse,
  MattersResponse,
  ContactsResponse,
  SyncResponse,
  TokenStatusResponse,
  HqOverviewData,
  CellDashboardData,
} from "@/types/Clio"

// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /clio/onboard-cell
 * Creates a new Cell row and returns the Clio OAuth URL.
 * Frontend should redirect to `data.authUrl` immediately after.
 */
export async function onboardCell(
  payload: OnboardRequest,
): Promise<OnboardResponse> {
  const res = await api.post<{ success: boolean; data: OnboardResponse }>(
    "/cells/onboard",
    payload,
  )
  return res.data.data
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /cells/:cellId/dashboard
 * Returns aggregated stats for the dashboard.
 */
export async function fetchDashboard(cellId: string): Promise<CellDashboardData> {
  const res = await api.get<{ success: boolean; data: CellDashboardData }>(
    `/cells/${cellId}/dashboard`,
  )
  return res.data.data
}

// ─────────────────────────────────────────────────────────────────────────────
// MATTERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /clio/matters/:cellId
 * Returns all stored matters for a cell.
 */
export async function fetchMatters(cellId: string): Promise<MattersResponse> {
  const res = await api.get<MattersResponse>(`/clio/matters/${cellId}`)
  return res.data
}

/**
 * POST /clio/sync/:cellId
 * Manually triggers a fresh sync from Clio.
 */
export async function syncMatters(cellId: string): Promise<SyncResponse> {
  const res = await api.post<SyncResponse>(`/clio/sync/${cellId}`)
  return res.data
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /clio/contacts/:cellId
 * Returns contacts list from Clio (live fetch).
 */
export async function fetchContacts(cellId: string): Promise<ContactsResponse> {
  const res = await api.get<ContactsResponse>(`/clio/contacts/${cellId}`)
  return res.data
}

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /clio/token-status/:cellId
 * Check if a cell is connected and token is valid.
 */
export async function fetchTokenStatus(
  cellId: string,
): Promise<TokenStatusResponse> {
  const res = await api.get<TokenStatusResponse>(`/clio/token-status/${cellId}`)
  return res.data
}

export async function fetchHqOverview() {
  const res = await api.get<{ success: boolean; data: HqOverviewData }>(
    "/hq/overview",
  )
  return res.data.data
}


 /*
  POST /cells/:cellId/sync
 * Triggers a full background sync for a cell.
 * Returns immediately — sync runs async on the backend.
 */
export async function triggerSync(cellId: string): Promise<{ queued: boolean; cellId: string }> {
  const res = await api.post<{ success: boolean; data: { queued: boolean; cellId: string } }>(
    `/cells/${cellId}/sync`,
  )
  return res.data.data
}