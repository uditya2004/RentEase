"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface RentBreakdown {
  component: string
  amount: number
  description: string
}

interface RentSummary {
  month: string
  year: number
  totalAmount: number
  paidAmount: number
  dueAmount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  breakdown: RentBreakdown[]
  paymentInstructions: string
}

const mockRentData: RentSummary = {
  month: "January",
  year: 2024,
  totalAmount: 1368.0,
  paidAmount: 0,
  dueAmount: 1368.0,
  dueDate: "2024-01-31",
  status: "pending",
  breakdown: [
    { component: "Base Rent", amount: 1200.0, description: "Monthly base rent amount" },
    { component: "Electricity", amount: 118.0, description: "150 units × $0.12/unit" },
    { component: "Water", amount: 50.0, description: "Monthly water charges" },
  ],
  paymentInstructions: "Please pay via UPI to: landlord@upi or Bank Transfer to Account: 1234567890",
}

const paymentHistory = [
  { month: "December 2023", amount: 1285.0, paidDate: "2023-12-28", status: "paid" },
  { month: "November 2023", amount: 1320.0, paidDate: "2023-11-30", status: "paid" },
  { month: "October 2023", amount: 1295.0, paidDate: "2023-10-29", status: "paid" },
]

export function RentSummary() {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

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

  const downloadInvoice = () => {
    // Mock download functionality
    console.log("Downloading invoice for", mockRentData.month, mockRentData.year)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Rent Summary</h1>
        <div className="flex gap-2">
          <Button variant={activeTab === "current" ? "default" : "outline"} onClick={() => setActiveTab("current")}>
            Current Month
          </Button>
          <Button variant={activeTab === "history" ? "default" : "outline"} onClick={() => setActiveTab("history")}>
            Payment History
          </Button>
        </div>
      </div>

      {activeTab === "current" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Current Month Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {mockRentData.month} {mockRentData.year}
                  </span>
                  <Badge className={getStatusColor(mockRentData.status)}>
                    {getStatusIcon(mockRentData.status)}
                    <span className="ml-1 capitalize">{mockRentData.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold">${mockRentData.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="text-lg font-semibold">{new Date(mockRentData.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {mockRentData.dueAmount > 0 && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-800 dark:text-yellow-200">
                          Outstanding Amount: ${mockRentData.dueAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rent Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRentData.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{item.component}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <p className="font-semibold">${item.amount.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>${mockRentData.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">{mockRentData.paymentInstructions}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Payment Methods:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• UPI Payment (Recommended)</li>
                      <li>• Bank Transfer</li>
                      <li>• Cash Payment to Landlord</li>
                      <li>• Check Payment</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button onClick={downloadInvoice} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Please ensure payment is made before the due date to avoid late fees.</p>
                  <p>• Include your unit number in payment reference.</p>
                  <p>• Contact landlord immediately if you notice any discrepancies.</p>
                  <p>• Keep payment receipts for your records.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Payment History */
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(payment.status)}
                      <div>
                        <p className="font-medium">{payment.month}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid on {new Date(payment.paidDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
