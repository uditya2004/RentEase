"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Plus, Users, MapPin, Edit, Trash2 } from "lucide-react"

interface Property {
  id: string
  name: string
  address: string
  type: "apartment" | "house" | "commercial"
  totalUnits: number
  occupiedUnits: number
}

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  unit: string
  rentAmount: number
  joinDate: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Main St, City",
    type: "apartment",
    totalUnits: 12,
    occupiedUnits: 10,
  },
  {
    id: "2",
    name: "Downtown Office Complex",
    address: "456 Business Ave, City",
    type: "commercial",
    totalUnits: 8,
    occupiedUnits: 6,
  },
]

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567891",
    propertyId: "1",
    unit: "Apt 101",
    rentAmount: 1200,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "+1234567892",
    propertyId: "1",
    unit: "Apt 205",
    rentAmount: 1350,
    joinDate: "2024-02-01",
  },
]

export function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [selectedProperty, setSelectedProperty] = useState<string>("")
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false)

  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    type: "apartment" as const,
    totalUnits: 1,
  })

  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
    rentAmount: 0,
  })

  const handleAddProperty = () => {
    const property: Property = {
      id: Date.now().toString(),
      ...newProperty,
      occupiedUnits: 0,
    }
    setProperties([...properties, property])
    setNewProperty({ name: "", address: "", type: "apartment", totalUnits: 1 })
    setIsAddPropertyOpen(false)
  }

  const handleAddTenant = () => {
    if (!selectedProperty) return

    const tenant: Tenant = {
      id: Date.now().toString(),
      ...newTenant,
      propertyId: selectedProperty,
      joinDate: new Date().toISOString().split("T")[0],
    }
    setTenants([...tenants, tenant])

    // Update occupied units
    setProperties(properties.map((p) => (p.id === selectedProperty ? { ...p, occupiedUnits: p.occupiedUnits + 1 } : p)))

    setNewTenant({ name: "", email: "", phone: "", unit: "", rentAmount: 0 })
    setIsAddTenantOpen(false)
  }

  const getPropertyTenants = (propertyId: string) => {
    return tenants.filter((t) => t.propertyId === propertyId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
        <div className="flex gap-2">
          <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="property-name">Property Name</Label>
                  <Input
                    id="property-name"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                    placeholder="Enter property name"
                  />
                </div>
                <div>
                  <Label htmlFor="property-address">Address</Label>
                  <Input
                    id="property-address"
                    value={newProperty.address}
                    onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                    placeholder="Enter full address"
                  />
                </div>
                <div>
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select
                    value={newProperty.type}
                    onValueChange={(value: any) => setNewProperty({ ...newProperty, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="total-units">Total Units</Label>
                  <Input
                    id="total-units"
                    type="number"
                    value={newProperty.totalUnits}
                    onChange={(e) =>
                      setNewProperty({ ...newProperty, totalUnits: Number.parseInt(e.target.value) || 1 })
                    }
                    min="1"
                  />
                </div>
                <Button onClick={handleAddProperty} className="w-full">
                  Add Property
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tenant-property">Select Property</Label>
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a property" />
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
                <div>
                  <Label htmlFor="tenant-name">Tenant Name</Label>
                  <Input
                    id="tenant-name"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                    placeholder="Enter tenant name"
                  />
                </div>
                <div>
                  <Label htmlFor="tenant-email">Email</Label>
                  <Input
                    id="tenant-email"
                    type="email"
                    value={newTenant.email}
                    onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="tenant-phone">Phone</Label>
                  <Input
                    id="tenant-phone"
                    value={newTenant.phone}
                    onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="tenant-unit">Unit/Room</Label>
                  <Input
                    id="tenant-unit"
                    value={newTenant.unit}
                    onChange={(e) => setNewTenant({ ...newTenant, unit: e.target.value })}
                    placeholder="e.g., Apt 101, Room A"
                  />
                </div>
                <div>
                  <Label htmlFor="rent-amount">Monthly Rent</Label>
                  <Input
                    id="rent-amount"
                    type="number"
                    value={newTenant.rentAmount}
                    onChange={(e) => setNewTenant({ ...newTenant, rentAmount: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="Enter monthly rent amount"
                  />
                </div>
                <Button onClick={handleAddTenant} className="w-full" disabled={!selectedProperty}>
                  Add Tenant
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{property.name}</CardTitle>
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {property.address}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Occupancy</span>
                  <span className="text-sm">
                    {property.occupiedUnits}/{property.totalUnits} units
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(property.occupiedUnits / property.totalUnits) * 100}%` }}
                  />
                </div>
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Tenants ({getPropertyTenants(property.id).length})</h4>
                  <div className="space-y-1">
                    {getPropertyTenants(property.id)
                      .slice(0, 3)
                      .map((tenant) => (
                        <div key={tenant.id} className="flex justify-between text-xs">
                          <span>{tenant.name}</span>
                          <span>{tenant.unit}</span>
                        </div>
                      ))}
                    {getPropertyTenants(property.id).length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{getPropertyTenants(property.id).length - 3} more
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
