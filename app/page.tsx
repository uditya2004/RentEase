"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { LandlordDashboard } from "@/components/landlord/dashboard"
import { TenantDashboard } from "@/components/tenant/dashboard"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <div className="flex-1 overflow-auto">
          <main className="h-full">{user.role === "landlord" ? <LandlordDashboard /> : <TenantDashboard />}</main>
        </div>
      </div>
    </div>
  )
}
