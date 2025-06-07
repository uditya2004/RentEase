"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Laptop, Smartphone, Tablet, Shield, Bell, Eye, Download, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"

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

export default function SettingsPage() {
  const { user } = useAuth()
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || defaultAvatars[0])
  const [userSettings, setUserSettings] = useState({
    fullName: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: user?.phone || "+1234567890",
    timezone: "utc-8",
    language: "en",
    currency: "usd",
    dateFormat: "mm-dd-yyyy",
    fontSize: 16,
    theme: "system",
    layout: "default",
    notifications: {
      email: true,
      push: true,
      sms: false,
      accountActivity: true,
      newFeatures: true,
      marketing: false,
      frequency: "real-time",
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
    },
    privacy: {
      analyticsSharing: true,
      personalizedAds: false,
      visibility: "public",
      dataRetention: "1-year",
    },
  })

  const handleSaveAccount = () => {
    toast.success("Account settings saved successfully")
  }

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully")
  }

  const handleSavePrivacy = () => {
    toast.success("Privacy settings saved successfully")
  }

  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully")
  }

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          {/* Mobile-friendly tabs */}
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-[500px] sm:min-w-0">
              <TabsTrigger value="account" className="text-xs sm:text-sm">
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm">
                Security
              </TabsTrigger>
              <TabsTrigger value="preferences" className="text-xs sm:text-sm">
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-xs sm:text-sm">
                Privacy
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account information and profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAccount} className="w-full sm:w-auto">
                  Save Account Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account&apos;s security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSecurity} className="w-full sm:w-auto">
                    Update Security Settings
                  </Button>
                </CardFooter>
              </Card>

              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active sessions across devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={userSettings.language}
                        onValueChange={(value) => setUserSettings({ ...userSettings, language: value })}
                      >
                        <SelectTrigger id="language">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={userSettings.currency}
                        onValueChange={(value) => setUserSettings({ ...userSettings, currency: value })}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select
                        value={userSettings.dateFormat}
                        onValueChange={(value) => setUserSettings({ ...userSettings, dateFormat: value })}
                      >
                        <SelectTrigger id="date-format">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Font Size: {userSettings.fontSize}px</Label>
                      <Slider
                        value={[userSettings.fontSize]}
                        onValueChange={(value) => setUserSettings({ ...userSettings, fontSize: value[0] })}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Theme</Label>
                  <RadioGroup
                    value={userSettings.theme}
                    onValueChange={(value) => setUserSettings({ ...userSettings, theme: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePreferences} className="w-full sm:w-auto">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                          checked={userSettings.notifications[item.key as keyof typeof userSettings.notifications] as boolean}
                          onCheckedChange={(checked) =>
                            setUserSettings({
                              ...userSettings,
                              notifications: { ...userSettings.notifications, [item.key]: checked },
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
                          checked={userSettings.notifications[item.key as keyof typeof userSettings.notifications] as boolean}
                          onCheckedChange={(checked) =>
                            setUserSettings({
                              ...userSettings,
                              notifications: { ...userSettings.notifications, [item.key]: checked },
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
                      value={userSettings.notifications.frequency}
                      onValueChange={(value) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, frequency: value },
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
                        value={userSettings.notifications.quietHoursStart}
                        onChange={(e) =>
                          setUserSettings({
                            ...userSettings,
                            notifications: { ...userSettings.notifications, quietHoursStart: e.target.value },
                          })
                        }
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={userSettings.notifications.quietHoursEnd}
                        onChange={(e) =>
                          setUserSettings({
                            ...userSettings,
                            notifications: { ...userSettings.notifications, quietHoursEnd: e.target.value },
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications} className="w-full sm:w-auto">
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control your privacy and data settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Data Sharing</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Analytics Sharing</Label>
                          <p className="text-sm text-muted-foreground">Help improve the app by sharing usage data</p>
                        </div>
                        <Switch
                          checked={userSettings.privacy.analyticsSharing}
                          onCheckedChange={(checked) =>
                            setUserSettings({
                              ...userSettings,
                              privacy: { ...userSettings.privacy, analyticsSharing: checked },
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
                          checked={userSettings.privacy.personalizedAds}
                          onCheckedChange={(checked) =>
                            setUserSettings({
                              ...userSettings,
                              privacy: { ...userSettings.privacy, personalizedAds: checked },
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
                        value={userSettings.privacy.visibility}
                        onValueChange={(value) =>
                          setUserSettings({ ...userSettings, privacy: { ...userSettings.privacy, visibility: value } })
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
                        value={userSettings.privacy.dataRetention}
                        onValueChange={(value) =>
                          setUserSettings({
                            ...userSettings,
                            privacy: { ...userSettings.privacy, dataRetention: value },
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
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePrivacy} className="w-full sm:w-auto">
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </Card>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your personal data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
