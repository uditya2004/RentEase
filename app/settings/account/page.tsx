"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

const defaultAvatars = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
]

export default function AccountSettingsPage() {
  const { user } = useAuth()
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || defaultAvatars[0])
  const [userSettings, setUserSettings] = useState({
    fullName: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: user?.phone || "+1234567890",
    timezone: "utc-8",
  })

  const handleSaveAccount = () => {
    toast.success("Account settings saved successfully")
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
          <h1 className="text-2xl sm:text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account information and profile</p>
        </div>

        {/* Avatar Section */}
        <div className="space-y-4">
          <Label>Profile Picture</Label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={selectedAvatar || "/placeholder.svg"} alt={userSettings.fullName} />
              <AvatarFallback>
                {userSettings.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Choose from available avatars</p>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                {defaultAvatars.slice(0, 8).map((avatar, index) => (
                  <Avatar
                    key={index}
                    className={`h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary ${
                      selectedAvatar === avatar ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <AvatarImage src={avatar || "/placeholder.svg"} alt={`Avatar ${index + 1}`} />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Personal Information */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              value={userSettings.fullName}
              onChange={(e) => setUserSettings({ ...userSettings, fullName: e.target.value })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userSettings.email}
                onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={userSettings.phone}
                onChange={(e) => setUserSettings({ ...userSettings, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={userSettings.timezone}
              onValueChange={(value) => setUserSettings({ ...userSettings, timezone: value })}
            >
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-12">International Date Line West (UTC-12)</SelectItem>
                <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                <SelectItem value="utc+5.5">Indian Standard Time (UTC+5:30)</SelectItem>
                <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSaveAccount} className="w-full sm:w-auto">
            Save Account Settings
          </Button>
        </div>
      </div>
    </div>
  )
} 