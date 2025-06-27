// import MealPackageManagement from "@/components/service-content"
import MealManageByAdmin from "@/components/service-content"
import { ServiceHeader } from "@/components/service-header"
// import { ServiceContent } from "@/components/service-content"

// MealPackageManagement
import { DashboardLayout } from "@/dashboard"

export default function ServicePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* <ServiceHeader /> */}
        <MealManageByAdmin />
      </div>
    </DashboardLayout>
  )
}
