"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Calculator,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { useMediaQuery } from "@/hooks/use-media-query"

const landlordNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/properties",
    icon: Building2,
  },
  {
    title: "Tenants",
    href: "/tenants",
    icon: Users,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: FileText,
  },
  {
    title: "Rent Calculator",
    href: "/rent-calculator",
    icon: Calculator,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

const tenantNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Rent Summary",
    href: "/rent-summary",
    icon: CreditCard,
  },
  {
    title: "Payment History",
    href: "/payment-history",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!user) return null

  const navItems = user.role === "landlord" ? landlordNavItems : tenantNavItems

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/" onClick={onItemClick}>
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-lg">RentEase</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { user } = useAuth()

  if (!user) return null

  if (isMobile) {
    return (
      <>
        <Button variant="ghost" className="fixed left-4 top-4 z-50 md:hidden" size="sm" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent onItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 flex-shrink-0">
      <SidebarContent />
    </div>
  )
}
