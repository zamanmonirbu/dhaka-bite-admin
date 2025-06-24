"use client"

import { useGetClientAppsQuery } from "@/lib/features/client/clientApi"
import { CustomerStats } from "@/components/customer-stats"
import { CustomersTable } from "@/components/customers-table"
import { DashboardLayout } from "@/dashboard"

export default function CustomersPage() {
  const { data, isLoading, error } = useGetClientAppsQuery()

  const customers = data?.data?.customerList || []

const stats = data?.data || {}

  console.log("Customers data:", customers)

  return (
    <DashboardLayout>
      <div className="space-y-4">
       <CustomerStats
  total={stats?.totalCustomers || 0}
  active={stats?.totalActiveCustomers || 0}
  inactive={stats?.totalInactiveCustomers || 0}
  newThisMonth={stats?.totalNewThisMonth || 0}
/>

        {isLoading && <p>Loading customers...</p>}
        {error && <p>Failed to load customers.</p>}

        {!isLoading && !error && <CustomersTable customers={customers} />}
      </div>
    </DashboardLayout>
  )
}
