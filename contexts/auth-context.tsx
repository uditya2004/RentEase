"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "landlord" | "tenant"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (phone: string, otp: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Landlord",
    email: "john@example.com",
    phone: "+1234567890",
    role: "landlord",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38184074.jpg-M4vCjTSSWVw5RwWvvmrxXBcNVU8MBU.jpeg",
  },
  {
    id: "2",
    name: "Sarah Tenant",
    email: "sarah@example.com",
    phone: "+1234567891",
    role: "tenant",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("rentease_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Update the login function to always accept 123456 as the OTP
  const login = async (phone: string, otp: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock OTP verification - always accept 123456
    if (otp === "123456") {
      const foundUser = mockUsers.find((u) => u.phone === phone)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("rentease_user", JSON.stringify(foundUser))
        setIsLoading(false)
        return true
      }
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rentease_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
