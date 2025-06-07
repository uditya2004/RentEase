"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, DollarSign, AlertTriangle, TrendingUp, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Properties",
    value: "3",
    icon: Building2,
    description: "Active properties",
  },
  {
    title: "Total Tenants",
    value: "12",
    icon: Users,
    description: "Across all properties",
  },
  {
    title: "Monthly Revenue",
    value: "$14,850",
    icon: DollarSign,
    description: "Expected this month",
  },
  {
    title: "Pending Payments",
    value: "4",
    icon: AlertTriangle,
    description: "Require attention",
  },
]

const recentActivity = [
  { action: "New tenant added", property: "Sunset Apartments", time: "2 hours ago" },
  { action: "Rent payment received", tenant: "Sarah Johnson", time: "4 hours ago" },
  { action: "Maintenance request", property: "Downtown Complex", time: "1 day ago" },
  { action: "Lease renewal", tenant: "Mike Chen", time: "2 days ago" },
]

const upcomingTasks = [
  { task: "Collect meter readings", dueDate: "Jan 28", priority: "high" },
  { task: "Send rent reminders", dueDate: "Jan 30", priority: "medium" },
  { task: "Property inspection", dueDate: "Feb 5", priority: "low" },
  { task: "Lease renewal discussion", dueDate: "Feb 10", priority: "medium" },
]

export function LandlordDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Landlord Dashboard</h1>
        <div className="text-sm text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your properties.</div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.property || activity.tenant} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
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
