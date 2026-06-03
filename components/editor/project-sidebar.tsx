"use client"

import * as React from "react"
import { X, Plus, FolderKanban, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <h2 className="text-sm font-semibold">Projects</h2>
          <Button variant="ghost" size="icon-xs" onClick={onClose}>
            <X className="size-4" />
            <span className="sr-only">Close projects</span>
          </Button>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <Tabs defaultValue="my-projects" className="flex h-full flex-col">
            <TabsList className="mb-4 w-full grid grid-cols-2">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-projects" className="flex-1 data-[state=inactive]:hidden">
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
                <FolderKanban className="size-8 opacity-20" />
                <p className="text-xs">No projects found.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="shared" className="flex-1 data-[state=inactive]:hidden">
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
                <Share2 className="size-8 opacity-20" />
                <p className="text-xs">No shared projects.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t p-4">
          <Button className="w-full justify-start gap-2" variant="default">
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
