"use client"

import * as React from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

interface Project {
  id: string
  name: string
  role?: string
}

interface EditorHomeClientProps {
  ownedProjects: Project[]
  sharedProjects: Project[]
}

export function EditorHomeClient({ ownedProjects, sharedProjects }: EditorHomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const { open } = useProjectDialogs()

  return (
    <div className="flex min-h-screen flex-col bg-[#080809]">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
      />

      <main className="flex-1 pt-14">
        <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center p-4">
          <div className="mx-auto max-w-lg space-y-8 text-center px-4">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Create a project or open an existing one
              </h1>
              <p className="text-lg text-[#808090]">
                Start a new architecture workspace, or choose a project from the sidebar.
              </p>
            </div>
            
            <Button 
              onClick={() => open("create")}
              className="h-12 px-8 bg-[#00c8d4] text-[#080809] hover:bg-[#00c8d4]/90 rounded-xl"
            >
              <Plus className="mr-2 size-5" />
              New Project
            </Button>
          </div>
        </div>
      </main>

      <ProjectDialogs />
    </div>
  )
}
