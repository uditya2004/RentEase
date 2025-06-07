"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Plus, Edit, Trash2, Search, Download, Phone, Mail, MapPin, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Property {
  id: string
  name: string
  address: string
  type: "apartment" | "house" | "commercial"
}

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  propertyName: string
  unit: string
  rentAmount: number
  joinDate: string
  status: "active" | "inactive" | "pending"
  leaseEnd: string
  avatar?: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Main St, City",
    type: "apartment",
  },
  {
    id: "2",
    name: "Downtown Office Complex",
    address: "456 Business Ave, City",
    type: "commercial",
  },
  {
    id: "3",
    name: "Riverside Homes",
    address: "789 River Rd, City",
    type: "house",
  },
]

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567891",
    propertyId: "1",
    propertyName: "Sunset Apartments",
    unit: "Apt 101",
    rentAmount: 1200,
    joinDate: "2024-01-15",
    status: "active",
    leaseEnd: "2025-01-14",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "+1234567892",
    propertyId: "1",
    propertyName: "Sunset Apartments",
    unit: "Apt 205",
    rentAmount: 1350,
    joinDate: "2024-02-01",
    status: "active",
    leaseEnd: "2025-01-31",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: "3",
    name: "Lisa Wang",
    email: "lisa@example.com",
    phone: "+1234567893",
    propertyId: "1",
    propertyName: "Sunset Apartments",
    unit: "Apt 301",
    rentAmount: 1400,
    joinDate: "2023-11-15",
    status: "active",
    leaseEnd: "2024-11-14",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: "4",
    name: "David Smith",
    email: "david@example.com",
    phone: "+1234567894",
    propertyId: "2",
    propertyName: "Downtown Office Complex",
    unit: "Suite 10",
    rentAmount: 2500,
    joinDate: "2023-10-01",
    status: "active",
    leaseEnd: "2024-09-30",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1234567895",
    propertyId: "3",
    propertyName: "Riverside Homes",
    unit: "House 5",
    rentAmount: 1800,
    joinDate: "2024-01-01",
    status: "pending",
    leaseEnd: "2024-12-31",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
]

export function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [properties] = useState<Property[]>(mockProperties)
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false)
  const [isEditTenantOpen, setIsEditTenantOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterProperty, setFilterProperty] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")


  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    propertyId: "",
    unit: "",
    rentAmount: 0,
    joinDate: new Date().toISOString().split("T")[0],
    leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    status: "active" as "active" | "inactive" | "pending",
  })

  const handleAddTenant = () => {
    const selectedProperty = properties.find((p) => p.id === newTenant.propertyId)

    const tenant: Tenant = {
      id: Date.now().toString(),
      ...newTenant,
      propertyName: selectedProperty?.name || "",
    }

    setTenants([...tenants, tenant])
    setNewTenant({
      name: "",
      email: "",
      phone: "",
      propertyId: "",
      unit: "",
      rentAmount: 0,
      joinDate: new Date().toISOString().split("T")[0],
      leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      status: "active",
    })
    setIsAddTenantOpen(false)
  }

  const handleEditTenant = () => {
    if (!selectedTenant) return

    const selectedProperty = properties.find((p) => p.id === selectedTenant.propertyId)

    setTenants(
      tenants.map((t) =>
        t.id === selectedTenant.id
          ? {
              ...selectedTenant,
              propertyName: selectedProperty?.name || t.propertyName,
            }
          : t,
      ),
    )

    setIsEditTenantOpen(false)
    setSelectedTenant(null)
  }

  const handleDeleteTenant = (id: string) => {
    setTenants(tenants.filter((t) => t.id !== id))
  }

  const openEditDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsEditTenantOpen(true)
  }

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery)

    const matchesProperty = filterProperty === "all" || tenant.propertyId === filterProperty
    const matchesStatus = filterStatus === "all" || tenant.status === filterStatus

    return matchesSearch && matchesProperty && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const exportTenantList = () => {
    console.log("Exporting tenant list...")
    alert("Tenant list exported successfully!")
  }

  const TenantForm = ({ tenant, onSave, onCancel }: { tenant?: Tenant; onSave: () => void; onCancel: () => void }) => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="tenant-name">Tenant Name</Label>
          <Input
            id="tenant-name"
            value={tenant ? selectedTenant?.name || "" : newTenant.name}
            onChange={(e) => {
              if (tenant && selectedTenant) {
                setSelectedTenant({ ...selectedTenant, name: e.target.value })
              } else {
                setNewTenant({ ...newTenant, name: e.target.value })
              }
            }}
            placeholder="Enter tenant name"
          />
        </div>
        <div>
          <Label htmlFor="tenant-email">Email</Label>
          <Input
            id="tenant-email"
            type="email"
            value={tenant ? selectedTenant?.email || "" : newTenant.email}
            onChange={(e) => {
              if (tenant && selectedTenant) {
                setSelectedTenant({ ...selectedTenant, email: e.target.value })
              } else {
                setNewTenant({ ...newTenant, email: e.target.value })
              }
            }}
            placeholder="Enter email address"
          />
        </div>
        <div>
          <Label htmlFor="tenant-phone">Phone</Label>
          <Input
            id="tenant-phone"
            value={tenant ? selectedTenant?.phone || "" : newTenant.phone}
            onChange={(e) => {
              if (tenant && selectedTenant) {
                setSelectedTenant({ ...selectedTenant, phone: e.target.value })
              } else {
                setNewTenant({ ...newTenant, phone: e.target.value })
              }
            }}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <Label htmlFor="tenant-property">Property</Label>
          <Select
            value={tenant ? selectedTenant?.propertyId || "" : newTenant.propertyId}
            onValueChange={(value) => {
              if (tenant && selectedTenant) {
                setSelectedTenant({ ...selectedTenant, propertyId: value })
              } else {
                setNewTenant({ ...newTenant, propertyId: value })
              }
            }}
          >
            <SelectTrigger id="tenant-property">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tenant-unit">Unit/Room</Label>
            <Input
              id="tenant-unit"
              value={tenant ? selectedTenant?.unit || "" : newTenant.unit}
              onChange={(e) => {
                if (tenant && selectedTenant) {
                  setSelectedTenant({ ...selectedTenant, unit: e.target.value })
                } else {
                  setNewTenant({ ...newTenant, unit: e.target.value })
                }
              }}
              placeholder="e.g., Apt 101"
            />
          </div>
          <div>
            <Label htmlFor="rent-amount">Monthly Rent</Label>
            <Input
              id="rent-amount"
              type="number"
              value={tenant ? selectedTenant?.rentAmount || "" : newTenant.rentAmount || ""}
              onChange={(e) => {
                const value = Number(e.target.value) || 0
                if (tenant && selectedTenant) {
                  setSelectedTenant({ ...selectedTenant, rentAmount: value })
                } else {
                  setNewTenant({ ...newTenant, rentAmount: value })
                }
              }}
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="join-date">Join Date</Label>
            <Input
              id="join-date"
              type="date"
              value={tenant ? selectedTenant?.joinDate || "" : newTenant.joinDate}
              onChange={(e) => {
                if (tenant && selectedTenant) {
                  setSelectedTenant({ ...selectedTenant, joinDate: e.target.value })
                } else {
                  setNewTenant({ ...newTenant, joinDate: e.target.value })
                }
              }}
            />
          </div>
          <div>
            <Label htmlFor="lease-end">Lease End Date</Label>
            <Input
              id="lease-end"
              type="date"
              value={tenant ? selectedTenant?.leaseEnd || "" : newTenant.leaseEnd}
              onChange={(e) => {
                if (tenant && selectedTenant) {
                  setSelectedTenant({ ...selectedTenant, leaseEnd: e.target.value })
                } else {
                  setNewTenant({ ...newTenant, leaseEnd: e.target.value })
                }
              }}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="tenant-status">Status</Label>
          <Select
            value={tenant ? selectedTenant?.status || "" : newTenant.status}
            onValueChange={(value: "active" | "inactive" | "pending") => {
              if (tenant && selectedTenant) {
                setSelectedTenant({ ...selectedTenant, status: value })
              } else {
                setNewTenant({ ...newTenant, status: value })
              }
            }}
          >
            <SelectTrigger id="tenant-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-2 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">
          Cancel
        </Button>
        <Button onClick={onSave} className="flex-1 sm:flex-none">
          {tenant ? "Save Changes" : "Add Tenant"}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tenant Management</h1>

        {/* Mobile Add Button */}
        <div className="sm:hidden">
          <Sheet open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
            <SheetTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh]">
              <SheetHeader>
                <SheetTitle>Add New Tenant</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto">
                <TenantForm onSave={handleAddTenant} onCancel={() => setIsAddTenantOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Add Button */}
        <div className="hidden sm:block">
          <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
              </DialogHeader>
              <TenantForm onSave={handleAddTenant} onCancel={() => setIsAddTenantOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterProperty} onValueChange={setFilterProperty}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={exportTenantList} className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTenants.length > 0 ? (
          filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={tenant.avatar || "/placeholder.svg"} alt={tenant.name} />
                        <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate">{tenant.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{tenant.unit}</p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(tenant)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteTenant(tenant.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {getStatusBadge(tenant.status)}
                  </div>

                  {/* Property */}
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{tenant.propertyName}</span>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{tenant.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{tenant.phone}</span>
                    </div>
                  </div>

                  {/* Rent & Lease */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Rent</p>
                      <p className="font-semibold">${tenant.rentAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Lease End</p>
                      <p className="text-sm">{new Date(tenant.leaseEnd).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No tenants found matching your filters.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Edit Tenant Dialog/Sheet */}
      {/* Mobile Edit */}
      <Sheet open={isEditTenantOpen && window.innerWidth < 640} onOpenChange={setIsEditTenantOpen}>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>Edit Tenant</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto">
            {selectedTenant && (
              <TenantForm
                tenant={selectedTenant}
                onSave={handleEditTenant}
                onCancel={() => setIsEditTenantOpen(false)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Edit */}
      <Dialog open={isEditTenantOpen && window.innerWidth >= 640} onOpenChange={setIsEditTenantOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <TenantForm tenant={selectedTenant} onSave={handleEditTenant} onCancel={() => setIsEditTenantOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
