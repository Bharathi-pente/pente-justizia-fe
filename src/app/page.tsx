"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
const HomePage = () => {
  const router = useRouter()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Justizia Dashboard</h1>
      <h1>HEy </h1>
      <button>hello</button>
      <Button onClick={() => router.push("/hq")}> Go to HQ Overview</Button>
    </div>
  )
}

export default HomePage
