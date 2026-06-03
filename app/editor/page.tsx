"use client"

import * as React from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 pt-14 px-4">
        <div className="mx-auto max-w-7xl py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Ghost AI
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Your professional AI companion for structured thinking and creative coding.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
