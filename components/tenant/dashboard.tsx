"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, AlertCircle, Download, MessageSquare, Clock } from "lucide-react"

const currentRent = {
  month: "January 2024",
  totalAmount: 1368.0,
  dueAmount: 1368.0,
  dueDate: "2024-01-31",
  status: "pending",
}

const quickActions = [
  { title: "View Rent Details", icon: DollarSign, action: "rent-details" },
  { title: "Download Invoice", icon: Download, action: "download" },
  { title: "Contact Landlord", icon: MessageSquare, action: "chat" },
  { title: "Payment History", icon: Clock, action: "history" },
]

const notifications = [
  { message: "Rent for January 2024 is due in 3 days", type: "warning", time: "2 hours ago" },
  { message: "Electricity meter reading updated", type: "info", time: "1 day ago" },
  { message: "December rent payment confirmed", type: "success", time: "3 days ago" },
]

export function TenantDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <Clock className="h-4 w-4 text-green-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tenant Dashboard</h1>
        <div className="text-sm text-muted-foreground">Welcome back! Here's your rent summary.</div>
      </div>

      {/* Current Rent Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Month Rent - {currentRent.month}</span>
            <Badge className={getStatusColor(currentRent.status)}>
              {currentRent.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
              <span className="capitalize">{currentRent.status}</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">${currentRent.totalAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Amount</p>
              <p className="text-2xl font-bold text-red-600">${currentRent.dueAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="text-lg font-semibold">{new Date(currentRent.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          {currentRent.dueAmount > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">
                  Payment due in{" "}
                  {Math.ceil((new Date(currentRent.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                  days
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="justify-start h-auto p-4">
                  <action.icon className="mr-3 h-5 w-5" />
                  <span>{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
