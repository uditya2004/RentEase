"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { Smartphone, Shield } from "lucide-react"

export function LoginForm() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSendOTP = () => {
    if (phone.length < 10) {
      setError("Please enter a valid phone number")
      return
    }
    setError("")
    setStep("otp")
  }

  const handleVerifyOTP = async () => {
    const success = await login(phone, otp)
    if (!success) {
      setError("Invalid OTP. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to RentEase</CardTitle>
          <CardDescription>
            {step === "phone" ? "Enter your phone number to continue" : "Enter the OTP sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === "phone" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleSendOTP} className="w-full" disabled={isLoading}>
                Send OTP
              </Button>
              <div className="text-center text-sm text-gray-500">
                Demo phones: +1234567890 (Landlord), +1234567891 (Tenant)
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button onClick={handleVerifyOTP} className="w-full" disabled={isLoading}>
                Verify OTP
              </Button>
              <Button variant="outline" onClick={() => setStep("phone")} className="w-full">
                Change Phone Number
              </Button>
              <div className="text-center text-sm text-gray-500">Demo OTP: 123456</div>
            </>
          )}

          {error && <div className="text-sm text-red-600 text-center">{error}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
