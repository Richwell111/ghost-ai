import { create } from "zustand"

type DialogType = "create" | "rename" | "delete" | null

interface Project {
  id: string
  name: string
}

interface ProjectDialogState {
  type: DialogType
  project?: Project
  isOpen: boolean
  open: (type: DialogType, project?: Project) => void
  close: () => void
}

export const useProjectDialogs = create<ProjectDialogState>((set) => ({
  type: null,
  project: undefined,
  isOpen: false,
  open: (type, project = undefined) => set({ type, project, isOpen: true }),
  close: () => set({ type: null, project: undefined, isOpen: false }),
}))
