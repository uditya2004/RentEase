"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { LandlordDashboard } from "@/components/landlord/dashboard"
import { TenantDashboard } from "@/components/tenant/dashboard"

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

  return user.role === "landlord" ? <LandlordDashboard /> : <TenantDashboard />
}
