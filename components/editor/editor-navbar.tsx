"use client"

import * as React from "react"
import { UserButton } from "@clerk/nextjs"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
}

export function EditorNavbar({ isSidebarOpen, onSidebarToggle }: EditorNavbarProps) {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
        <span className="text-sm font-semibold tracking-tight">Ghost AI</span>
      </div>

      <div className="flex-1 px-4 text-center">
        {/* Center section - can be used for title or breadcrumbs later */}
      </div>

      <div className="flex items-center gap-2">
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "size-8"
            }
          }}
        />
      </div>
    </nav>
  )
}
