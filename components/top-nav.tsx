"use client"

import { Bell, Search, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"

export function TopNav() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  if (!user) return null

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:block">
          <nav className="flex items-center space-x-1 text-sm">
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  className="font-medium hover:text-primary transition-colors capitalize"
                >
                  {segment.replace("-", " ")}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Mobile title */}
        <div className="sm:hidden">
          <h1 className="font-semibold capitalize">
            {pathSegments.length > 0 ? pathSegments[pathSegments.length - 1].replace("-", " ") : "Dashboard"}
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:block">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-8 w-[200px] lg:w-[300px]" />
            </div>
          </div>

          <Badge variant="outline" className="capitalize hidden sm:inline-flex">
            {user.role}
          </Badge>

          <ThemeToggle />

          <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
