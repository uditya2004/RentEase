"use client"

import { User, Lock, Bell, Shield, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Settings Menu */}
        <div className="space-y-1">
          <button
            onClick={() => {
              window.location.href = "/settings/account"
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Account</p>
                <p className="text-sm text-muted-foreground">Manage your account information</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={() => {
              window.location.href = "/settings/security"
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center">
                <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Security</p>
                <p className="text-sm text-muted-foreground">Manage account security</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={() => {
              window.location.href = "/settings/notifications"
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Notify</p>
                <p className="text-sm text-muted-foreground">Configure notification settings</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={() => {
              window.location.href = "/settings/privacy"
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Privacy</p>
                <p className="text-sm text-muted-foreground">Manage privacy settings</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>
    </div>
  )
}
