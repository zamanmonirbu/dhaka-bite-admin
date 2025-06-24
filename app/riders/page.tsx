import { RidersHeader } from "@/components/riders-header"
import { RiderStats } from "@/components/rider-stats"
import { RidersTable } from "@/components/riders-table"
import { DashboardLayout } from "@/dashboard"
import AddRiderManager from "@/components/AddRiderManager"

export default function RidersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* <RidersHeader /> */}
        <AddRiderManager />
        <RiderStats />
        <RidersTable />
      </div>
    </DashboardLayout>
  )
}
