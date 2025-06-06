"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Building2,
  Calculator,
  Receipt,
  MessageSquare,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  Users,
  BarChart3,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"

const landlordNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Rent Calculator", href: "/rent-calculator", icon: Calculator },
  { name: "Tenants", href: "/tenants", icon: Users },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Messages", href: "/messages", icon: MessageSquare },
]

const tenantNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Rent Summary", href: "/rent-summary", icon: DollarSign },
  { name: "Payment History", href: "/payment-history", icon: Receipt },
  { name: "Messages", href: "/messages", icon: MessageSquare },
]

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  if (!user) return null

  const navigation = user.role === "landlord" ? landlordNavigation : tenantNavigation

  const NavItem = ({ item, onClick }: { item: any; onClick?: () => void }) => (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        pathname === item.href
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2",
      )}
    >
      <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
      {!isCollapsed && <span>{item.name}</span>}
    </Link>
  )

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          {!isCollapsed && (
            <Link href="/" className="flex items-center font-semibold text-lg">
              <span className="text-primary">RentEase</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn("ml-auto h-8 w-8 lg:flex hidden", isCollapsed && "ml-0")}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} onClick={onItemClick} />
          ))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border p-4">
        <nav className="space-y-1">
          {bottomNavigation.map((item) => (
            <NavItem key={item.name} item={item} onClick={onItemClick} />
          ))}
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent onItemClick={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col bg-background border-r border-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-72",
        )}
      >
        <SidebarContent />
      </div>
    </>
  )
}
