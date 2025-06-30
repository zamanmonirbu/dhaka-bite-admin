import AdminOrdersList from '@/components/AdminOrdersList'
import { DashboardLayout } from '@/dashboard'
import React from 'react'

export default function page() {
  return (
    <DashboardLayout>
    <AdminOrdersList />
    </DashboardLayout>
  )
}
