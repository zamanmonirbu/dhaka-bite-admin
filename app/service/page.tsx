import { ServiceHeader } from "@/components/service-header"
import { ServiceContent } from "@/components/service-content"
import { DashboardLayout } from "@/dashboard"

export default function ServicePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ServiceHeader />
        <ServiceContent />
      </div>
    </DashboardLayout>
  )
}
