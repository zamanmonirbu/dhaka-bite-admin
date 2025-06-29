// import { DashboardLayout } from "@/dashboard";
import AllPaymentsTable from "@/components/AllPaymentsTable";
import { DashboardLayout } from "@/dashboard";

export default function FinancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <AllPaymentsTable />
      </div>
    </DashboardLayout>
  );
}

