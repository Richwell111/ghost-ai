"use client"

import * as React from "react"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { slugify } from "@/lib/utils"
import { useProjectActions } from "@/hooks/use-project-actions"

export function ProjectDialogs() {
  const { type, project, isOpen, close } = useProjectDialogs()
  const { handleCreate, handleRename, handleDelete, isLoading: isActionLoading } = useProjectActions()
  const [name, setName] = React.useState("")

  // Reset state when dialog opens or changes
  React.useEffect(() => {
    if (isOpen) {
      setName(project?.name ?? "")
    } else {
      setTimeout(() => setName(""), 300) // Clear after exit animation
    }
  }, [isOpen, project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (type === "create") {
      await handleCreate(name)
    } else if (type === "rename" && project) {
      await handleRename(project.id, name)
    } else if (type === "delete" && project) {
      await handleDelete(project.id)
    }
  }

  const slug = slugify(name)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px] border-[#2a2a30] bg-[#111114]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-white">
              {type === "create" && "Create Project"}
              {type === "rename" && "Rename Project"}
              {type === "delete" && "Delete Project"}
            </DialogTitle>
            <DialogDescription className="text-[#808090]">
              {type === "create" && "Start a new architecture workspace."}
              {type === "rename" && `Rename "${project?.name}". Enter a new name below.`}
              {type === "delete" && `Are you sure you want to delete "${project?.name}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>

          {type !== "delete" && (
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium text-[#c0c0cc]">
                  Project Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Awesome System"
                  autoFocus
                  className="border-[#2a2a30] bg-[#080809] text-white focus-visible:ring-[#00c8d4]"
                />
              </div>

              {type === "create" && (
                <div className="space-y-1.5 rounded-lg border border-[#2a2a30] bg-[#080809] p-3">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-[#505060]">
                    Slug Preview
                  </Label>
                  <p className="text-sm font-mono text-[#00c8d4]">
                    ghost-ai.io/projects/{slug || "..."}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={close}
              className="text-[#c0c0cc] hover:bg-[#1e1e23] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={type === "delete" ? "destructive" : "default"}
              disabled={isActionLoading || (type !== "delete" && !name.trim())}
              className={type !== "delete" ? "bg-[#00c8d4] text-[#080809] hover:bg-[#00c8d4]/90" : ""}
            >
              {isActionLoading ? "Saving..." : type === "create" ? "Create" : type === "rename" ? "Save" : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
