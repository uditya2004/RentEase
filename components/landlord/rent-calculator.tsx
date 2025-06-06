"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, Plus, Minus, Eye } from "lucide-react"

interface RentComponent {
  id: string
  name: string
  type: "fixed" | "variable" | "calculated"
  amount?: number
  formula?: string
  description: string
}

interface RentCalculation {
  tenantId: string
  tenantName: string
  components: RentComponent[]
  totalAmount: number
  dueDate: string
}

const defaultComponents: RentComponent[] = [
  {
    id: "1",
    name: "Base Rent",
    type: "fixed",
    amount: 1200,
    description: "Monthly base rent amount",
  },
  {
    id: "2",
    name: "Electricity",
    type: "calculated",
    formula: "(currentReading - previousReading) * unitRate",
    description: "Electricity charges based on meter reading",
  },
  {
    id: "3",
    name: "Water",
    type: "fixed",
    amount: 50,
    description: "Monthly water charges",
  },
]

export function RentCalculator() {
  const [selectedTenant, setSelectedTenant] = useState("")
  const [components, setComponents] = useState<RentComponent[]>(defaultComponents)
  const [newComponent, setNewComponent] = useState({
    name: "",
    type: "fixed" as const,
    amount: 0,
    formula: "",
    description: "",
  })
  const [showPreview, setShowPreview] = useState(false)

  // Mock calculation variables
  const [calculationVars, setCalculationVars] = useState({
    previousReading: 1000,
    currentReading: 1150,
    unitRate: 0.12,
    extraCost: 0,
    advancePaid: 0,
  })

  const addComponent = () => {
    if (!newComponent.name) return

    const component: RentComponent = {
      id: Date.now().toString(),
      ...newComponent,
    }
    setComponents([...components, component])
    setNewComponent({
      name: "",
      type: "fixed",
      amount: 0,
      formula: "",
      description: "",
    })
  }

  const removeComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id))
  }

  const calculateComponentAmount = (component: RentComponent): number => {
    if (component.type === "fixed") {
      return component.amount || 0
    }

    if (component.type === "calculated" && component.formula) {
      try {
        // Simple formula evaluation for demo
        const { previousReading, currentReading, unitRate } = calculationVars
        const consumption = currentReading - previousReading

        if (component.formula.includes("currentReading - previousReading")) {
          return consumption * unitRate
        }

        return component.amount || 0
      } catch (error) {
        return 0
      }
    }

    return component.amount || 0
  }

  const getTotalAmount = (): number => {
    return components.reduce((total, component) => {
      return total + calculateComponentAmount(component)
    }, 0)
  }

  const generateInvoice = () => {
    // Mock invoice generation
    console.log("Generating invoice for tenant:", selectedTenant)
    console.log("Components:", components)
    console.log("Total amount:", getTotalAmount())
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Rent Calculator</h1>
        <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          {showPreview ? "Hide" : "Show"} Preview
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant1">Sarah Johnson - Apt 101</SelectItem>
                  <SelectItem value="tenant2">Mike Chen - Apt 205</SelectItem>
                  <SelectItem value="tenant3">Lisa Wang - Apt 301</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculation Variables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prev-reading">Previous Reading</Label>
                  <Input
                    id="prev-reading"
                    type="number"
                    value={calculationVars.previousReading}
                    onChange={(e) =>
                      setCalculationVars({
                        ...calculationVars,
                        previousReading: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="curr-reading">Current Reading</Label>
                  <Input
                    id="curr-reading"
                    type="number"
                    value={calculationVars.currentReading}
                    onChange={(e) =>
                      setCalculationVars({
                        ...calculationVars,
                        currentReading: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="unit-rate">Unit Rate ($)</Label>
                  <Input
                    id="unit-rate"
                    type="number"
                    step="0.01"
                    value={calculationVars.unitRate}
                    onChange={(e) =>
                      setCalculationVars({
                        ...calculationVars,
                        unitRate: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="extra-cost">Extra Cost ($)</Label>
                  <Input
                    id="extra-cost"
                    type="number"
                    value={calculationVars.extraCost}
                    onChange={(e) =>
                      setCalculationVars({
                        ...calculationVars,
                        extraCost: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rent Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {components.map((component) => (
                <div key={component.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{component.name}</div>
                    <div className="text-sm text-muted-foreground">{component.description}</div>
                    <div className="text-sm">
                      {component.type === "fixed"
                        ? `$${component.amount}`
                        : component.type === "calculated"
                          ? `Formula: ${component.formula}`
                          : `$${component.amount}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${calculateComponentAmount(component).toFixed(2)}</span>
                    <Button variant="outline" size="sm" onClick={() => removeComponent(component.id)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="component-name">Component Name</Label>
                    <Input
                      id="component-name"
                      value={newComponent.name}
                      onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                      placeholder="e.g., Internet, Parking"
                    />
                  </div>
                  <div>
                    <Label htmlFor="component-type">Type</Label>
                    <Select
                      value={newComponent.type}
                      onValueChange={(value: any) => setNewComponent({ ...newComponent, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="calculated">Calculated</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newComponent.type === "fixed" || newComponent.type === "variable" ? (
                    <div>
                      <Label htmlFor="component-amount">Amount ($)</Label>
                      <Input
                        id="component-amount"
                        type="number"
                        value={newComponent.amount}
                        onChange={(e) =>
                          setNewComponent({ ...newComponent, amount: Number.parseFloat(e.target.value) || 0 })
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="component-formula">Formula</Label>
                      <Input
                        id="component-formula"
                        value={newComponent.formula}
                        onChange={(e) => setNewComponent({ ...newComponent, formula: e.target.value })}
                        placeholder="e.g., (currentReading - previousReading) * unitRate"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="component-description">Description</Label>
                    <Textarea
                      id="component-description"
                      value={newComponent.description}
                      onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
                      placeholder="Brief description of this component"
                    />
                  </div>
                  <Button onClick={addComponent} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Component
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Rent Calculation Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    Tenant: {selectedTenant ? "Sarah Johnson - Apt 101" : "No tenant selected"}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Rent Breakdown:</h4>
                    {components.map((component) => (
                      <div key={component.id} className="flex justify-between">
                        <span>{component.name}</span>
                        <span>${calculateComponentAmount(component).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={generateInvoice} className="w-full" disabled={!selectedTenant}>
                      Generate Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>Previous Reading: {calculationVars.previousReading} units</div>
                  <div>Current Reading: {calculationVars.currentReading} units</div>
                  <div>Consumption: {calculationVars.currentReading - calculationVars.previousReading} units</div>
                  <div>Unit Rate: ${calculationVars.unitRate}/unit</div>
                  <div>
                    Electricity Cost: $
                    {(
                      (calculationVars.currentReading - calculationVars.previousReading) *
                      calculationVars.unitRate
                    ).toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
