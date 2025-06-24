"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Edit, Trash2, MoreHorizontal, Download, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
interface Customer {
  _id: string
  name: string
  phone: string
  email: string
  address: string
  area: string
  status?: string
  balance: number
  joinDate?: string
  isMealActive: boolean
  profileImage?: string
}

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  console.log(customers)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.isMealActive) ||
      (statusFilter === "inactive" && !customer.isMealActive)
    return matchesSearch && matchesStatus
  })

  return (
    <>
      {/* keep your filter/search UI same */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={customer.profileImage}
                    alt={customer.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {customer.name}
                </div>
              </TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.address || customer.area}</TableCell>
              <TableCell>
                <Badge
                  className={
                    customer.isMealActive
                      ? "bg-[#016102] hover:bg-[#016102]/90"
                      : "bg-[#777980] hover:bg-[#777980]/90"
                  }
                >
                  {customer.isMealActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>৳{customer.balance}</TableCell>
              <TableCell>
                {/* keep your actions like edit, view, delete */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
