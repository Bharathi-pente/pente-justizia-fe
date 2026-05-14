import axios from "axios"

/**
 * Single Axios instance for all backend calls.
 * Set NEXT_PUBLIC_API_URL in your .env.local:
 *   NEXT_PUBLIC_API_URL=http://localhost:3000
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

// Request interceptor — good place to attach JWT later
api.interceptors.request.use((config) => {
  // e.g. config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — centralised error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    console.error("[API Error]", message)
    return Promise.reject(new Error(message))
  },
)

export default api
