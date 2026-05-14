import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { triggerSync } from "@/services/clio.service"
import { CLIO_QUERY_KEY } from "@/hook/useClioData"

const POLL_INTERVAL = 3000 // check every 3s
const POLL_TIMEOUT = 60000 // stop after 60s no matter what

export function useSyncCell(cellId: string) {
  const queryClient = useQueryClient()
  const [isSyncing, setIsSyncing] = useState(false)

  const mutation = useMutation({
    mutationFn: () => triggerSync(cellId),

    onSuccess: () => {
      setIsSyncing(true)
      pollUntilComplete()
    },

    onError: () => {
      setIsSyncing(false)
    },
  })

  function pollUntilComplete() {
    const startedAt = Date.now()

    const interval = setInterval(async () => {
      // Refetch fresh dashboard data
      await queryClient.invalidateQueries({
        queryKey: CLIO_QUERY_KEY(cellId),
      })

      // Read the latest cached data after refetch
      const cached = queryClient.getQueryData<{ status: string }>(
        CLIO_QUERY_KEY(cellId),
      )

      const elapsed = Date.now() - startedAt
      const stillSyncing = cached?.status === "SYNCING"
      const timedOut = elapsed >= POLL_TIMEOUT

      if (!stillSyncing || timedOut) {
        clearInterval(interval)
        setIsSyncing(false)

        // Final refetch to make sure UI is fully up to date
        queryClient.invalidateQueries({
          queryKey: CLIO_QUERY_KEY(cellId),
        })
      }
    }, POLL_INTERVAL)
  }

  return {
    mutate: mutation.mutate,
    isPending: isSyncing || mutation.isPending,
    isSuccess: mutation.isSuccess && !isSyncing,
    isError: mutation.isError,
    error: mutation.error,
  }
}
