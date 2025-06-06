"use client"

interface Property {
  id: string
  name: string
}

interface Tenant {
  id: string
  name: string
  propertyId: string
  propertyName: string
  unit: string
}

interface MeterReading {
  id: string
  tenantId: string
  tenantName: string
  propertyName: string
  unit: string
  month: string
  year: number
  readingDate: string
  electricity: {
    previous: number
    current: number
    consumption: number
    rate: number
    amount: number
  }
  water?: {
    previous: number
    current: number
    consumption: number
    rate: number
    amount: number
  }
  internet?: {
    amount: number
  }
  status: "draft" | "processed" | "invoiced"
}

const mockProperties: Property[] = [
  { id: "1", name: "Sunset Apartments" },
  { id: "2", name: "Downtown Office Complex" },
  { id: "3", name: "Riverside Homes" },
]

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    propertyId: "1",
    propertyName: "Sunset Apartments",
    unit: "Apt 101",
  },
  {
    id: "2",
    name: "Mike Chen",
    propertyId: "1",
    propertyName: "Sunset Apartments",
    unit: "Apt 205",
  },
  {
    id: "3",
    name: "Lisa Wang",
    propertyId: "1",
    propertyName: "Sunset Apartments",
    unit: "Apt 301",
  },
  {
    id: "4",
    name: "David Smith",
    propertyId: "2",
    propertyName: "Downtown Office Complex",
    unit: "Suite 10",
  },
]

const mockMeterReadings: MeterReading[] = [
  {
    id: "1",
    tenantId: "1",
    tenantName: "Sarah Johnson",
    propertyName: "Sunset Apartments",
    unit: "Apt 101",
    month: "January",
    year: 2024,
    readingDate: "2024-01-31",
    electricity: {
      previous: 1000,
      current: 1150,
      consumption: 150,
      rate: 0.12,
      amount: 18,
    },
    water: {
      previous: 500,
      current: 550,
      consumption: 50,
      rate: 0.05,
      amount: 2.5,
    },
    internet: {
      amount: 60,
    },
    status: "invoiced",
  },
  {
    id: "2",
    tenantId: "2",
    tenantName: "Mike Chen",
    propertyName: "Sunset Apartments",
    unit: "Apt 205",
    month: "January",
    year: 2024,\
