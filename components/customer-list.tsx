"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react"

type Customer = {
  name: string
  phone: string
  email: string
  address: string
}

interface CustomerListProps {
  customers: Customer[]
}

export function CustomerList({ customers }: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = customers?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="border-[#b0ceb1]/20">
      <CardHeader>
        <CardTitle className="text-[#1d1f2c]">Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#b0ceb1] border-[#b0ceb1] text-white placeholder:text-white/70"
            />
          </div>
          <Button variant="outline" size="icon" className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border border-[#b0ceb1]/20">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#eaf6ec]/50">
                <TableHead className="text-[#1d1f2c] font-semibold">Clients Name</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Phone</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Email</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Address</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered?.map((customer, index) => (
                <TableRow key={index} className="hover:bg-[#eaf6ec]/30">
                  <TableCell className="font-medium text-[#1d1f2c]">{customer.name}</TableCell>
                  <TableCell className="text-[#777980]">{customer.phone}</TableCell>
                  <TableCell className="text-[#777980]">{customer.email}</TableCell>
                  <TableCell className="text-[#777980]">{customer.address}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#eaf6ec]">
                        <Eye className="h-4 w-4 text-[#016102]" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#eaf6ec]">
                        <Edit className="h-4 w-4 text-[#777980]" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
