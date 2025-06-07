"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function NotificationsSettingsPage() {
  const { user } = useAuth()
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    accountActivity: true,
    newFeatures: true,
    marketing: false,
    frequency: "real-time",
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
  })

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully")
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
          <h1 className="text-2xl sm:text-3xl font-bold">Notification Settings</h1>
          <p className="text-muted-foreground">Manage how you receive notifications</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Notification Channels</Label>
            <div className="space-y-3">
              {[
                { key: "email", label: "Email Notifications", description: "Receive notifications via email" },
                {
                  key: "push",
                  label: "Push Notifications",
                  description: "Receive push notifications on your device",
                },
                { key: "sms", label: "SMS Notifications", description: "Receive notifications via SMS" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        [item.key]: checked,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Notification Types</Label>
            <div className="space-y-3">
              {[
                {
                  key: "accountActivity",
                  label: "Account Activity",
                  description: "Login attempts, password changes",
                },
                { key: "newFeatures", label: "New Features", description: "Updates about new app features" },
                { key: "marketing", label: "Marketing", description: "Promotional emails and offers" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        [item.key]: checked,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="notification-frequency">Notification Frequency</Label>
              <Select
                value={notificationSettings.frequency}
                onValueChange={(value) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    frequency: value,
                  })
                }
              >
                <SelectTrigger id="notification-frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-time">Real-time</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Quiet Hours</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={notificationSettings.quietHoursStart}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      quietHoursStart: e.target.value,
                    })
                  }
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={notificationSettings.quietHoursEnd}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      quietHoursEnd: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSaveNotifications} className="w-full sm:w-auto">
              Save Notification Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 