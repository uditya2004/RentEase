"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Download,
  Send,
  Printer,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react"

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  propertyName: string
  unit: string
}

interface InvoiceItem {
  id: string
  description: string
  amount: number
}

interface Invoice {
  id: string
  tenantId: string
  tenantName: string
  propertyName: string
  unit: string
  month: string
  year: number
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  totalAmount: number
  status: "paid" | "pending" | "overdue"
  paidDate?: string
  paidAmount?: number
}

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567891",
    propertyName: "Sunset Apartments",
    unit: "Apt 101",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "+1234567892",
    propertyName: "Sunset Apartments",
    unit: "Apt 205",
  },
  {
    id: "3",
    name: "Lisa Wang",
    email: "lisa@example.com",
    phone: "+1234567893",
    propertyName: "Sunset Apartments",
    unit: "Apt 301",
  },
  {
    id: "4",
    name: "David Smith",
    email: "david@example.com",
    phone: "+1234567894",
    propertyName: "Downtown Office Complex",
    unit: "Suite 10",
  },
]

const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    tenantId: "1",
    tenantName: "Sarah Johnson",
    propertyName: "Sunset Apartments",
    unit: "Apt 101",
    month: "January",
    year: 2024,
    issueDate: "2024-01-01",
    dueDate: "2024-01-15",
    items: [
      { id: "1", description: "Base Rent", amount: 1200 },
      { id: "2", description: "Electricity (150 units)", amount: 118 },
      { id: "3", description: "Water", amount: 50 },
    ],
    totalAmount: 1368,
    status: "paid",
    paidDate: "2024-01-12",
    paidAmount: 1368,
  },
  {
    id: "INV-2024-002",
    tenantId: "2",
    tenantName: "Mike Chen",
    propertyName: "Sunset Apartments",
    unit: "Apt 205",
    month: "January",
    year: 2024,
    issueDate: "2024-01-01",
    dueDate: "2024-01-15",
    items: [
      { id: "1", description: "Base Rent", amount: 1350 },
      { id: "2", description: "Electricity (120 units)", amount: 96 },
      { id: "3", description: "Water", amount: 50 },
      { id: "4", description: "Internet", amount: 60 },
    ],
    totalAmount: 1556,
    status: "pending",
  },
  {
    id: "INV-2024-003",
    tenantId: "3",
    tenantName: "Lisa Wang",
    propertyName: "Sunset Apartments",
    unit: "Apt 301",
    month: "January",
    year: 2024,
    issueDate: "2024-01-01",
    dueDate: "2024-01-10",
    items: [
      { id: "1", description: "Base Rent", amount: 1400 },
      { id: "2", description: "Electricity (180 units)", amount: 144 },
      { id: "3", description: "Water", amount: 50 },
    ],
    totalAmount: 1594,
    status: "overdue",
  },
]

export function InvoiceGenerator() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [tenants] = useState<Tenant[]>(mockTenants)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterMonth, setFilterMonth] = useState<string>("all")
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false)
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const [paidAmount, setPaidAmount] = useState<number>(0)
  const [paidDate, setPaidDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [sendEmail, setSendEmail] = useState<boolean>(true)

  const [newInvoice, setNewInvoice] = useState({
    tenantId: "",
    month: "January",
    year: 2024,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0],
    items: [
      { id: "1", description: "Base Rent", amount: 0 },
      { id: "2", description: "Electricity", amount: 0 },
      { id: "3", description: "Water", amount: 0 },
    ],
  })

  const handleCreateInvoice = () => {
    const selectedTenant = tenants.find((t) => t.id === newInvoice.tenantId)
    if (!selectedTenant) return

    const totalAmount = newInvoice.items.reduce((sum, item) => sum + item.amount, 0)

    const invoice: Invoice = {
      id: `INV-${newInvoice.year}-${String(invoices.length + 1).padStart(3, "0")}`,
      tenantId: selectedTenant.id,
      tenantName: selectedTenant.name,
      propertyName: selectedTenant.propertyName,
      unit: selectedTenant.unit,
      month: newInvoice.month,
      year: newInvoice.year,
      issueDate: newInvoice.issueDate,
      dueDate: newInvoice.dueDate,
      items: newInvoice.items,
      totalAmount,
      status: "pending",
    }

    setInvoices([...invoices, invoice])

    // Reset form
    setNewInvoice({
      tenantId: "",
      month: "January",
      year: 2024,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0],
      items: [
        { id: "1", description: "Base Rent", amount: 0 },
        { id: "2", description: "Electricity", amount: 0 },
        { id: "3", description: "Water", amount: 0 },
      ],
    })

    setIsCreateInvoiceOpen(false)
  }

  const handleAddInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { id: Date.now().toString(), description: "", amount: 0 }],
    })
  }

  const handleRemoveInvoiceItem = (id: string) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((item) => item.id !== id),
    })
  }

  const handleUpdateInvoiceItem = (id: string, field: string, value: string | number) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.map((item) =>
        item.id === id ? { ...item, [field]: field === "amount" ? Number(value) : value } : item,
      ),
    })
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsViewInvoiceOpen(true)
  }

  const handleOpenMarkAsPaid = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setPaidAmount(invoice.totalAmount)
    setPaidDate(new Date().toISOString().split("T")[0])
    setIsMarkAsPaidOpen(true)
  }

  const handleMarkAsPaid = () => {
    if (!selectedInvoice) return

    setInvoices(
      invoices.map((invoice) =>
        invoice.id === selectedInvoice.id
          ? {
              ...invoice,
              status: "paid",
              paidDate,
              paidAmount,
            }
          : invoice,
      ),
    )

    setIsMarkAsPaidOpen(false)
    setSelectedInvoice(null)
  }

  const downloadInvoice = (invoice: Invoice) => {
    // Mock download functionality
    console.log("Downloading invoice:", invoice.id)
    alert(`Invoice ${invoice.id} downloaded successfully!`)
  }

  const sendInvoice = (invoice: Invoice) => {
    // Mock send functionality
    console.log("Sending invoice:", invoice.id, "to", invoice.tenantName)
    alert(`Invoice ${invoice.id} sent to ${invoice.tenantName} successfully!`)
  }

  const printInvoice = (invoice: Invoice) => {
    // Mock print functionality
    console.log("Printing invoice:", invoice.id)
    alert(`Invoice ${invoice.id} sent to printer!`)
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

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    const matchesMonth = filterMonth === "all" || invoice.month === filterMonth

    return matchesSearch && matchesStatus && matchesMonth
  })

  const calculateTotal = () => {
    return newInvoice.items.reduce((sum, item) => sum + item.amount, 0)
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoice Management</h1>
        <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tenant">Select Tenant</Label>
                  <Select
                    value={newInvoice.tenantId}
                    onValueChange={(value) => setNewInvoice({ ...newInvoice, tenantId: value })}
                  >
                    <SelectTrigger id="tenant">
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      {tenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          {tenant.name} - {tenant.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="month">Month & Year</Label>
                  <div className="flex gap-2">
                    <Select
                      value={newInvoice.month}
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, month: value })}
                    >
                      <SelectTrigger id="month" className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={String(newInvoice.year)}
                      onValueChange={(value) => setNewInvoice({ ...newInvoice, year: Number(value) })}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={newInvoice.issueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, issueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Invoice Items</Label>
                <div className="border rounded-md p-4 space-y-4">
                  {newInvoice.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-7">
                        <Input
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => handleUpdateInvoiceItem(item.id, "description", e.target.value)}
                        />
                      </div>
                      <div className="col-span-4">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={item.amount || ""}
                          onChange={(e) => handleUpdateInvoiceItem(item.id, "amount", e.target.value)}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {index > 0 && (
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveInvoiceItem(item.id)}>
                            &times;
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={handleAddInvoiceItem} className="w-full">
                    Add Item
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="send-email"
                    checked={sendEmail}
                    onCheckedChange={(checked) => setSendEmail(!!checked)}
                  />
                  <Label htmlFor="send-email">Send email to tenant</Label>
                </div>
                <Button onClick={handleCreateInvoice} disabled={!newInvoice.tenantId || calculateTotal() <= 0}>
                  Create Invoice
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterMonth} onValueChange={setFilterMonth}>
                      <SelectTrigger className="w-[150px]">
                        <Calendar className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
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

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.length > 0 ? (
                        filteredInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{invoice.tenantName}</div>
                                <div className="text-sm text-muted-foreground">{invoice.unit}</div>
                              </div>
                            </TableCell>
                            <TableCell>{invoice.propertyName}</TableCell>
                            <TableCell>
                              <div>
                                <div>
                                  {invoice.month} {invoice.year}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleViewInvoice(invoice)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => downloadInvoice(invoice)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => sendInvoice(invoice)}>
                                  <Send className="h-4 w-4" />
                                </Button>
                                {invoice.status !== "paid" && (
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenMarkAsPaid(invoice)}>
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No invoices found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">{/* Similar content as "all" but filtered for pending invoices */}</TabsContent>
        <TabsContent value="paid">{/* Similar content as "all" but filtered for paid invoices */}</TabsContent>
        <TabsContent value="overdue">{/* Similar content as "all" but filtered for overdue invoices */}</TabsContent>
      </Tabs>

      {/* View Invoice Dialog */}
      <Dialog open={isViewInvoiceOpen} onOpenChange={setIsViewInvoiceOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Invoice #{selectedInvoice.id}</h3>
                  <p className="text-muted-foreground">
                    {selectedInvoice.month} {selectedInvoice.year}
                  </p>
                </div>
                <div>{getStatusBadge(selectedInvoice.status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Property</h4>
                  <p>{selectedInvoice.propertyName}</p>
                  <p>{selectedInvoice.unit}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Tenant</h4>
                  <p>{selectedInvoice.tenantName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Issue Date</h4>
                  <p>{new Date(selectedInvoice.issueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Due Date</h4>
                  <p>{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Invoice Items</h4>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">
                          ${selectedInvoice.totalAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {selectedInvoice.status === "paid" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Paid Amount</p>
                      <p>${selectedInvoice.paidAmount?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paid Date</p>
                      <p>{selectedInvoice.paidDate && new Date(selectedInvoice.paidDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => printInvoice(selectedInvoice)}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" onClick={() => downloadInvoice(selectedInvoice)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => sendInvoice(selectedInvoice)}>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
                {selectedInvoice.status !== "paid" && (
                  <Button
                    onClick={() => {
                      setIsViewInvoiceOpen(false)
                      handleOpenMarkAsPaid(selectedInvoice)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mark as Paid Dialog */}
      <Dialog open={isMarkAsPaidOpen} onOpenChange={setIsMarkAsPaidOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Mark Invoice as Paid</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Invoice #{selectedInvoice.id}</p>
                <p className="font-medium">
                  {selectedInvoice.tenantName} - {selectedInvoice.month} {selectedInvoice.year}
                </p>
                <p className="text-lg font-bold mt-2">Total Amount: ${selectedInvoice.totalAmount.toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="paid-amount">Paid Amount</Label>
                  <Input
                    id="paid-amount"
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="paid-date">Payment Date</Label>
                  <Input id="paid-date" type="date" value={paidDate} onChange={(e) => setPaidDate(e.target.value)} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-tenant" defaultChecked />
                  <Label htmlFor="notify-tenant">Notify tenant about payment</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsMarkAsPaidOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleMarkAsPaid}>Confirm Payment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
