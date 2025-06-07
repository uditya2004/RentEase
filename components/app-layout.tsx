"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { LoginForm } from "@/components/auth/login-form"
import { MobileSidebarProvider } from "@/components/mobile-sidebar-context"
import { Loader2 } from "lucide-react"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoginForm />
      </div>
    )
  }

  return (
    <MobileSidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  )
}
