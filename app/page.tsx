"use client"

import { useGetDashboardInfoQuery } from "@/lib/features/dashboard/dashboardApi"
import { StatsCards } from "@/components/stats-cards"
import { CustomerList } from "@/components/customer-list"
import { RiderList } from "@/components/rider-list"
import { DashboardLayout } from "@/dashboard"
import { DollarSign, Users, Bike } from "lucide-react"

export default function Home() {
  const { data, isLoading, error } = useGetDashboardInfoQuery({})

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Something went wrong!</p>

  const dashboardData = data?.data


  console.log("Dashboard Data:", dashboardData)

  const stats = [
    {
      title: "Total Earn",
      value: `${dashboardData?.totalEarn?.toFixed(2)}/-`,
      icon: DollarSign,
      color: "text-[#016102]",
      bgColor: "bg-[#eaf6ec]",
    },
    {
      title: "Total Clients",
      value: `${dashboardData?.totalUsers}`,
      icon: Users,
      color: "text-[#777980]",
      bgColor: "bg-[#f8f9fa]",
    },
    {
      title: "Total Riders",
      value: `${dashboardData?.totalRiders}`,
      icon: Bike,
      color: "text-[#777980]",
      bgColor: "bg-[#f8f9fa]",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Here's what's happening with your food delivery service today.</p>
        </div>

        <StatsCards stats={stats} />

        <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
          <CustomerList customers={dashboardData?.customerList || []} />
          <RiderList riders={dashboardData?.riderList || []} />
        </div>

      </div>
    </DashboardLayout>
  )
}
