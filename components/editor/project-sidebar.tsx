"use client"

import * as React from "react"
import { X, Plus, FolderKanban, Share2, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const MOCK_MY_PROJECTS = [
  { id: "1", name: "Alpha Service", slug: "alpha-service" },
  { id: "2", name: "Data Pipeline", slug: "data-pipeline" },
]

const MOCK_SHARED_PROJECTS = [
  { id: "3", name: "Team Dashboard", slug: "team-dashboard" },
]

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { open } = useProjectDialogs()

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#080809]/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#2a2a30] bg-[#111114] transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-[#2a2a30] px-4">
          <h2 className="text-sm font-semibold text-[#f0f0f4]">Projects</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-[#808090] hover:text-white">
            <X className="size-4" />
            <span className="sr-only">Close projects</span>
          </Button>
        </div>

        <div className="flex-1 overflow-hidden p-3">
          <Tabs defaultValue="my-projects" className="flex h-full flex-col">
            <TabsList className="mb-4 grid w-full grid-cols-2 bg-[#080809] p-1">
              <TabsTrigger 
                value="my-projects"
                className="data-[state=active]:bg-[#1e1e23] data-[state=active]:text-white text-[#808090]"
              >
                My Projects
              </TabsTrigger>
              <TabsTrigger 
                value="shared"
                className="data-[state=active]:bg-[#1e1e23] data-[state=active]:text-white text-[#808090]"
              >
                Shared
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-projects" className="flex-1 space-y-1 overflow-y-auto outline-none">
              {MOCK_MY_PROJECTS.length > 0 ? (
                MOCK_MY_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[#c0c0cc] hover:bg-[#1e1e23] hover:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FolderKanban className="size-4 shrink-0 text-[#00c8d4]/60" />
                      <span className="truncate">{project.name}</span>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex size-7 items-center justify-center rounded-lg text-[#808090] opacity-0 transition-all hover:bg-[#2a2a30] hover:text-white group-hover:opacity-100 outline-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32 border-[#2a2a30] bg-[#18181c]">
                        <DropdownMenuItem 
                          className="gap-2 text-[#c0c0cc] focus:bg-[#2a2a30] focus:text-white"
                          onClick={() => open("rename", project)}
                        >
                          <Pencil className="size-3.5" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 text-[#ff4d4f] focus:bg-[#ff4d4f]/10 focus:text-[#ff4d4f]"
                          onClick={() => open("delete", project)}
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#2a2a30] text-center text-[#505060]">
                  <FolderKanban className="size-8 opacity-20" />
                  <p className="text-xs">No projects found.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shared" className="flex-1 space-y-1 overflow-y-auto outline-none">
              {MOCK_SHARED_PROJECTS.length > 0 ? (
                MOCK_SHARED_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#c0c0cc] hover:bg-[#1e1e23] hover:text-white cursor-pointer"
                  >
                    <Share2 className="size-4 shrink-0 text-[#6457f9]/60" />
                    <span className="truncate font-sans">{project.name}</span>
                  </div>
                ))
              ) : (
                <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#2a2a30] text-center text-[#505060]">
                  <Share2 className="size-8 opacity-20" />
                  <p className="text-xs">No shared projects.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-[#2a2a30] p-4">
          <Button 
            onClick={() => open("create")}
            className="w-full justify-start gap-2 bg-[#00c8d4] text-[#080809] hover:bg-[#00c8d4]/90"
          >
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
