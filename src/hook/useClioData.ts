import { useQuery } from "@tanstack/react-query"
import { fetchDashboard } from "@/services/clio.service"
import type { CellDashboardData } from "@/types/Clio"

export const CLIO_QUERY_KEY = (cellId: string) =>
  ["clio-dashboard", cellId] as const

/**
 * Fetches dashboard data for a given cellId.
 * cellId is passed in from the parent — read from the URL in the page component,
 * never read from the URL inside this hook (keeps hooks reusable).
 */
export function useClioData(cellId: string) {
  return useQuery<CellDashboardData, Error>({
    queryKey: CLIO_QUERY_KEY(cellId),
    queryFn: () => fetchDashboard(cellId),
    enabled: !!cellId,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  })
}
