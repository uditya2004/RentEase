"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Download, Trash2, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function PrivacySettingsPage() {
  const { user } = useAuth()
  const [privacySettings, setPrivacySettings] = useState({
    analyticsSharing: true,
    personalizedAds: false,
    visibility: "public",
    dataRetention: "1-year",
  })

  const handleSavePrivacy = () => {
    toast.success("Privacy settings saved successfully")
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
          <h1 className="text-2xl sm:text-3xl font-bold">Privacy Settings</h1>
          <p className="text-muted-foreground">Control your privacy and data settings</p>
        </div>

        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Data Sharing</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Sharing</Label>
                    <p className="text-sm text-muted-foreground">Help improve the app by sharing usage data</p>
                  </div>
                  <Switch
                    checked={privacySettings.analyticsSharing}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({
                        ...privacySettings,
                        analyticsSharing: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Personalized Ads</Label>
                    <p className="text-sm text-muted-foreground">Show ads based on your interests</p>
                  </div>
                  <Switch
                    checked={privacySettings.personalizedAds}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({
                        ...privacySettings,
                        personalizedAds: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Account Visibility</Label>
                <RadioGroup
                  value={privacySettings.visibility}
                  onValueChange={(value) =>
                    setPrivacySettings({ ...privacySettings, visibility: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="visibility-public" />
                    <Label htmlFor="visibility-public">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="visibility-private" />
                    <Label htmlFor="visibility-private">Private</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label htmlFor="data-retention">Data Retention</Label>
                <Select
                  value={privacySettings.dataRetention}
                  onValueChange={(value) =>
                    setPrivacySettings({
                      ...privacySettings,
                      dataRetention: value,
                    })
                  }
                >
                  <SelectTrigger id="data-retention">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-years">2 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSavePrivacy} className="w-full sm:w-auto">
                Save Privacy Settings
              </Button>
            </div>
          </div>

          <Separator />

          {/* Data Management */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Data Management</h3>
              <p className="text-sm text-muted-foreground">Manage your personal data</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                Download Your Data
              </Button>
              <Button variant="destructive" className="flex-1 sm:flex-none">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              You can download a copy of your data or permanently delete your account. These actions cannot be
              undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 