"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  CreditCard,
  Building,
  User,
  Receipt
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface PaymentDetail {
  id: string
  month: string
  year: number
  amount: number
  paidDate: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paymentMethod: string
  transactionId?: string
  propertyName: string
  unit: string
  landlordName: string
  landlordEmail: string
  breakdown: {
    baseRent: number
    electricity: number
    water: number
    internet?: number
    maintenance?: number
  }
  meterReadings?: {
    previous: number
    current: number
    consumption: number
    rate: number
  }
  notes?: string
}

// Mock data - in real app this would come from API
const mockPaymentDetails: Record<string, PaymentDetail> = {
  "PAY-2024-001": {
    id: "PAY-2024-001",
    month: "January",
    year: 2024,
    amount: 1368,
    paidDate: "2024-01-12",
    dueDate: "2024-01-15",
    status: "paid",
    paymentMethod: "UPI",
    transactionId: "TXN123456789",
    propertyName: "Sunset Apartments",
    unit: "Apt 101",
    landlordName: "John Landlord",
    landlordEmail: "john@example.com",
    breakdown: {
      baseRent: 1200,
      electricity: 118,
      water: 50,
    },
    meterReadings: {
      previous: 1000,
      current: 1150,
      consumption: 150,
      rate: 0.12
    },
    notes: "Payment made on time. Thank you!"
  }
}

export default function PaymentDetailsPage() {
  const params = useParams()
  const paymentId = params.id as string
  const payment = mockPaymentDetails[paymentId]

  if (!payment) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-2">Payment Not Found</h1>
          <p className="text-muted-foreground mb-4">The payment details you're looking for could not be found.</p>
          <Link href="/payment-history">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payment History
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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

  const downloadReceipt = () => {
    console.log("Downloading receipt for:", payment.id)
    alert(`Receipt for ${payment.month} ${payment.year} downloaded successfully!`)
  }

  const printReceipt = () => {
    window.print()
  }

  const sharePayment = () => {
    if (navigator.share) {
      navigator.share({
        title: `Payment Receipt - ${payment.month} ${payment.year}`,
        text: `Payment of $${payment.amount} for ${payment.propertyName}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Payment link copied to clipboard!")
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/payment-history">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payment Details</h1>
            <p className="text-muted-foreground">
              {payment.month} {payment.year} • {payment.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={sharePayment}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={printReceipt}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="sm" onClick={downloadReceipt}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Payment Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
                {getStatusBadge(payment.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold">${payment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{payment.paymentMethod}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{new Date(payment.dueDate).toLocaleDateString()}</p>
                </div>
                {payment.status === "paid" && (
                  <div>
                    <p className="text-sm text-muted-foreground">Paid Date</p>
                    <p className="font-medium">{new Date(payment.paidDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {payment.transactionId && (
                <div>
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {payment.transactionId}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Base Rent</span>
                  <span className="font-medium">${payment.breakdown.baseRent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Electricity</span>
                  <span className="font-medium">${payment.breakdown.electricity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Water</span>
                  <span className="font-medium">${payment.breakdown.water.toFixed(2)}</span>
                </div>
                {payment.breakdown.internet && (
                  <div className="flex justify-between items-center">
                    <span>Internet</span>
                    <span className="font-medium">${payment.breakdown.internet.toFixed(2)}</span>
                  </div>
                )}
                {payment.breakdown.maintenance && (
                  <div className="flex justify-between items-center">
                    <span>Maintenance</span>
                    <span className="font-medium">${payment.breakdown.maintenance.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${payment.amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meter Readings */}
          {payment.meterReadings && (
            <Card>
              <CardHeader>
                <CardTitle>Electricity Meter Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Previous Reading</p>
                    <p className="font-medium">{payment.meterReadings.previous} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Reading</p>
                    <p className="font-medium">{payment.meterReadings.current} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Consumption</p>
                    <p className="font-medium">{payment.meterReadings.consumption} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rate</p>
                    <p className="font-medium">${payment.meterReadings.rate}/unit</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Calculation:</strong> {payment.meterReadings.consumption} units × ${payment.meterReadings.rate} = ${(payment.meterReadings.consumption * payment.meterReadings.rate).toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Property Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-medium">{payment.propertyName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unit</p>
                <p className="font-medium">{payment.unit}</p>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Landlord Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{payment.landlordName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{payment.landlordEmail}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Invoice Generated</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {payment.status === "paid" && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Payment Received</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.paidDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {payment.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{payment.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}