"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useProjectDialogs } from "./use-project-dialogs"
import { slugify } from "@/lib/utils"

export function useProjectActions() {
  const router = useRouter()
  const pathname = usePathname()
  const { close } = useProjectDialogs()
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async (name: string) => {
    setIsLoading(true)
    try {
      const suffix = Math.random().toString(36).substring(2, 6)
      const slug = `${slugify(name || "Untitled")}-${suffix}`
      
      const res = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name, slug }),
        headers: { "Content-Type": "application/json" }
      })

      if (!res.ok) throw new Error("Failed to create project")
      
      const project = await res.json()
      close()
      router.push(`/workspace/${project.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRename = async (id: string, name: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" }
      })

      if (!res.ok) throw new Error("Failed to rename project")
      
      close()
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) throw new Error("Failed to delete project")
      
      close()
      
      // If we are on the workspace page for this project, redirect to editor home
      if (pathname === `/workspace/${id}`) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleCreate,
    handleRename,
    handleDelete,
    isLoading,
  }
}
