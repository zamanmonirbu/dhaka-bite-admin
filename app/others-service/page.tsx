import { OtherServiceHeader } from "@/components/other-service-header"
import { OtherServiceContent } from "@/components/other-service-content"
import { DashboardLayout } from "@/dashboard"

export default function OthersServicePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <OtherServiceHeader />
        <OtherServiceContent />
      </div>
    </DashboardLayout>
  )
}
