"use client"

import { useEffect, useState } from "react"
import { useGetPaymentsQuery, useUpdateStatusMutation } from "@/lib/features/payment/menualPaymentApi"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

const statusOptions = ["pending", "completed", "failed", "cancelled"]

export default function AllPaymentsTable() {
  const [filterStatus, setFilterStatus] = useState<string>("pending")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  const { data, isLoading, refetch } = useGetPaymentsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: filterStatus,
  })

  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation()

  
  const allPayments = data?.data.data || []
  
  console.log("data", allPayments)
  const filteredPayments =
    filterStatus !== ""
      ? allPayments.filter((p) => p.status === filterStatus)
      : allPayments

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginated = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap()
      toast({
        title: "Success",
        description: `Payment status updated to ${newStatus}`,
      })
      refetch()
    } catch {
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-full h-10" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Payments</h2>
        <Select
          onValueChange={(value) => setFilterStatus(value as string)}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>{payment.userId?.name || "Unknown"}</TableCell>
              <TableCell>৳{payment.amount}</TableCell>
              <TableCell>{payment.mobileNumber}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{payment.reference}</TableCell>
              <TableCell>
                <Badge
                  className={
                    payment.status === "completed"
                      ? "bg-green-500"
                      : payment.status === "pending"
                      ? "bg-yellow-500"
                      : payment.status === "failed"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={payment.status}
                  onValueChange={(value) => handleStatusChange(payment._id, value as string)}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

