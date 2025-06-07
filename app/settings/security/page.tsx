"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Laptop, Smartphone, Tablet, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function SecuritySettingsPage() {
  const { user } = useAuth()

  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully")
  }

  if (!user) return null

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/settings" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Settings
          </Link>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground">Manage your account&apos;s security settings</p>
        </div>

        <div className="space-y-6">
          {/* Password Settings */}
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch />
            </div>

            <div className="pt-4">
              <Button onClick={handleSaveSecurity} className="w-full sm:w-auto">
                Update Security Settings
              </Button>
            </div>
          </div>

          <Separator />

          {/* Active Sessions */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Active Sessions</h3>
              <p className="text-sm text-muted-foreground">Manage your active sessions across devices</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  device: "iPhone 14",
                  browser: "Safari",
                  location: "New York, USA",
                  icon: Smartphone,
                  current: true,
                },
                {
                  device: "MacBook Pro",
                  browser: "Chrome",
                  location: "New York, USA",
                  icon: Laptop,
                  current: false,
                },
                { device: "iPad Air", browser: "Safari", location: "Boston, USA", icon: Tablet, current: false },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <session.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.browser} • {session.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.current && <Badge variant="secondary">Current</Badge>}
                    {!session.current && (
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 