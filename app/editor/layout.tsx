"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in")
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
