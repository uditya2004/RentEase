"use client"

import { useAuth } from "@/contexts/auth-context"
import { LandlordDashboard } from "@/components/landlord/dashboard"
import { TenantDashboard } from "@/components/tenant/dashboard"

export default function HomePage() {
  const { user } = useAuth()

  return user?.role === "landlord" ? <LandlordDashboard /> : <TenantDashboard />
}
