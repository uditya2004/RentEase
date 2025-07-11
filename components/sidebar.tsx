"use client"


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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { useAuth } from "@/contexts/auth-context"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useMobileSidebar } from "@/components/mobile-sidebar-context"

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
      <div className="flex h-16 sm:h-14 items-center border-b px-4 lg:px-6">
        <Link className="flex items-center gap-2 font-semibold min-h-[48px] sm:min-h-[40px] w-full" href="/" onClick={onItemClick}>
          <Building2 className="h-7 w-7 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          <span className="text-xl sm:text-lg font-bold">RentEase</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid items-start px-3 py-4 text-sm font-medium lg:px-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:text-primary text-base sm:text-sm font-medium sm:font-medium min-h-[48px] sm:min-h-[40px]",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { isOpen, close } = useMobileSidebar()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { user } = useAuth()

  if (!user) return null

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
        <SheetContent side="left" className="p-0 w-72 sm:w-64">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <SidebarContent onItemClick={close} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 flex-shrink-0">
      <SidebarContent />
    </div>
  )
}
