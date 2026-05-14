import { useState } from "react"
import { onboardCell } from "@/services/clio.service"

interface OnboardState {
  loading: boolean
  error: string | null
}

/**
 * Hook for the onboarding flow.
 *
 * Usage:
 *   const { submit, loading, error } = useOnboard()
 *   submit({ name: 'Ashwini UK Cell', region: 'eu' })
 *
 * On success it:
 *   1. Stores cellId in localStorage (so dashboard can read it after redirect)
 *   2. Redirects the browser to Clio's OAuth login page
 */
export function useOnboard() {
  const [state, setState] = useState<OnboardState>({
    loading: false,
    error: null,
  })

  async function submit(payload: { name: string }) {
    setState({ loading: true, error: null })

    try {
      const result = await onboardCell(payload)

      // Persist cellId so the dashboard page can read it from the URL
      // (backend will redirect to /dashboard?cellId=xxx after OAuth)
      localStorage.setItem("clio_cell_id", result.cellId)
      localStorage.setItem("clio_cell_name", result.name)

      // Redirect to Clio OAuth — user logs in, Clio calls backend callback,
      // backend redirects to /dashboard?cellId=xxx
      window.location.href = result.authUrl
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong"
      setState({ loading: false, error: message })
    }
  }

  return {
    submit,
    loading: state.loading,
    error: state.error,
  }
}
