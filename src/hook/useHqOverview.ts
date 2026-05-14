import { useQuery } from "@tanstack/react-query"
import { fetchHqOverview } from "@/services/clio.service"
import type { HqOverviewData } from "@/types/Clio"

export function useHqOverview() {
  return useQuery<HqOverviewData, Error>({
    queryKey: ["hq-overview"],
    queryFn: fetchHqOverview,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  })
}
