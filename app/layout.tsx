import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "sonner"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "RentEase - Smart Rent Management",
  description: "Streamline rent management for landlords and tenants",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="min-h-screen flex">
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <TopNav />
                <div className="flex-1 overflow-auto">
                  <main className="h-full">{children}</main>
                </div>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
