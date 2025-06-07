"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Download, Filter, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react"

interface PaymentRecord {
  id: string
  month: string
  year: number
  amount: number
  paidDate: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paymentMethod: string
  transactionId?: string
  breakdown: {
    baseRent: number
    electricity: number
    water: number
    internet?: number
    maintenance?: number
  }
}

const mockPaymentHistory: PaymentRecord[] = [
  {
    id: "PAY-2024-001",
    month: "January",
    year: 2024,
    amount: 1368,
    paidDate: "2024-01-12",
    dueDate: "2024-01-15",
    status: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN123456789",
    breakdown: {
      baseRent: 1200,
      electricity: 118,
      water: 50,
    },
  },
  {
    id: "PAY-2023-012",
    month: "December",
    year: 2023,
    amount: 1285,
    paidDate: "2023-12-28",
    dueDate: "2023-12-31",
    status: "paid",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN987654321",
    breakdown: {
      baseRent: 1200,
      electricity: 85,
      water: 50,
    },
  },
  {
    id: "PAY-2023-011",
    month: "November",
    year: 2023,
    amount: 1320,
    paidDate: "2023-11-30",
    dueDate: "2023-11-30",
    status: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN456789123",
    breakdown: {
      baseRent: 1200,
      electricity: 120,
      water: 50,
    },
  },
  {
    id: "PAY-2023-010",
    month: "October",
    year: 2023,
    amount: 1295,
    paidDate: "2023-10-29",
    dueDate: "2023-10-31",
    status: "paid",
    paymentMethod: "Cash",
    breakdown: {
      baseRent: 1200,
      electricity: 95,
      water: 50,
    },
  },
  {
    id: "PAY-2023-009",
    month: "September",
    year: 2023,
    amount: 1410,
    paidDate: "2023-09-25",
    dueDate: "2023-09-30",
    status: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN789123456",
    breakdown: {
      baseRent: 1200,
      electricity: 160,
      water: 50,
    },
  },
]

export function PaymentHistory() {
  const [payments] = useState<PaymentRecord[]>(mockPaymentHistory)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterYear, setFilterYear] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")


  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesYear = filterYear === "all" || payment.year.toString() === filterYear
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus

    return matchesSearch && matchesYear && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const downloadReceipt = (payment: PaymentRecord) => {
    console.log("Downloading receipt for:", payment.id)
    alert(`Receipt for ${payment.month} ${payment.year} downloaded successfully!`)
  }

  const exportHistory = () => {
    console.log("Exporting payment history...")
    alert("Payment history exported successfully!")
  }

  const totalPaid = filteredPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const years = Array.from(new Set(payments.map((p) => p.year))).sort((a, b) => b - a)

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payment History</h1>
          <p className="text-muted-foreground">View and manage your rent payment history</p>
        </div>
        <Button onClick={exportHistory} variant="outline" className="w-full sm:w-auto h-11 sm:h-10">
          <Download className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Export History</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Payments Made</p>
              <p className="text-2xl font-bold">{filteredPayments.filter((p) => p.status === "paid").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Payment</p>
              <p className="text-2xl font-bold">
                $
                {filteredPayments.length > 0
                  ? (totalPaid / filteredPayments.filter((p) => p.status === "paid").length).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">On-Time Payments</p>
              <p className="text-2xl font-bold">
                {
                  filteredPayments.filter((p) => p.status === "paid" && new Date(p.paidDate) <= new Date(p.dueDate))
                    .length
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="flex-1">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <div className="space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <Card key={payment.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {payment.month} {payment.year}
                      </h3>
                      <p className="text-sm text-muted-foreground">Payment ID: {payment.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(payment.status)}
                      <span className="font-bold text-lg">${payment.amount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="text-sm font-medium">{new Date(payment.dueDate).toLocaleDateString()}</p>
                    </div>
                    {payment.status === "paid" && (
                      <div>
                        <p className="text-xs text-muted-foreground">Paid Date</p>
                        <p className="text-sm font-medium">{new Date(payment.paidDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Payment Method</p>
                      <p className="text-sm font-medium">{payment.paymentMethod}</p>
                    </div>
                    {payment.transactionId && (
                      <div>
                        <p className="text-xs text-muted-foreground">Transaction ID</p>
                        <p className="text-sm font-medium font-mono">{payment.transactionId}</p>
                      </div>
                    )}
                  </div>

                  {/* Breakdown */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Payment Breakdown</p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Base Rent:</span>
                        <span className="text-sm font-medium">${payment.breakdown.baseRent.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Electricity:</span>
                        <span className="text-sm font-medium">${payment.breakdown.electricity.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Water:</span>
                        <span className="text-sm font-medium">${payment.breakdown.water.toFixed(2)}</span>
                      </div>
                      {payment.breakdown.internet && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Internet:</span>
                          <span className="text-sm font-medium">${payment.breakdown.internet.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {payment.status === "paid" && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="default"
                        onClick={() => downloadReceipt(payment)}
                        className="flex-1 sm:flex-none h-11 sm:h-10"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Download Receipt</span>
                        <span className="sm:hidden">Download</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="default"
                        onClick={() => console.log("View details for:", payment.id)}
                        className="flex-1 sm:flex-none h-11 sm:h-10"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No payment records found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
