"use client"

import { User, Lock, Bell, Shield, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"

export default function SettingsPage() {
  const { user } = useAuth()

  if (!user) return null

  const settingsItems = [
    {
      id: "account",
      title: "Account",
      description: "Manage your account information",
      icon: User,
      href: "/settings/account",
      iconBg: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "security",
      title: "Security",
      description: "Manage account security",
      icon: Lock,
      href: "/settings/security",
      iconBg: "bg-red-50 dark:bg-red-950",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure notification settings",
      icon: Bell,
      href: "/settings/notifications",
      iconBg: "bg-orange-50 dark:bg-orange-950",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      id: "privacy",
      title: "Privacy",
      description: "Manage privacy settings",
      icon: Shield,
      href: "/settings/privacy",
      iconBg: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Settings Grid - 2x2 on desktop, responsive on smaller screens */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl">
        {settingsItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-md transition-all duration-200 cursor-pointer">
            <CardContent className="p-0">
              <button
                onClick={() => {
                  window.location.href = item.href
                }}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/50 transition-colors rounded-lg"
              >
                {/* Icon Container */}
                <div className={`h-12 w-12 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Info Card */}
      <Card className="max-w-4xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Current User</h3>
              <p className="text-sm text-muted-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-950 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}