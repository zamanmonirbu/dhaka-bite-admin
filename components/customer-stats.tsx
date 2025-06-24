import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react"
interface CustomerStatsProps {
  total: number
  active: number
  inactive: number
  newThisMonth: number
}

export function CustomerStats({ total, active, inactive, newThisMonth }: CustomerStatsProps) {
  const stats = [
    {
      title: "Total Customers",
      value: total,
      change: "+0%", // Optional dynamic logic
      changeType: "increase",
      icon: Users,
      color: "text-[#016102]",
      bgColor: "bg-[#eaf6ec]",
    },
    {
      title: "Active Customers",
      value: active,
      change: "+0%",
      changeType: "increase",
      icon: UserCheck,
      color: "text-[#28a745]",
      bgColor: "bg-green-50",
    },
    {
      title: "Inactive Customers",
      value: inactive,
      change: "-0%",
      changeType: "decrease",
      icon: UserX,
      color: "text-[#777980]",
      bgColor: "bg-gray-50",
    },
    {
      title: "New This Month",
      value: newThisMonth,
      change: "+0%",
      changeType: "increase",
      icon: TrendingUp,
      color: "text-[#016102]",
      bgColor: "bg-[#eaf6ec]",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-[#b0ceb1]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#777980]">{stat.title}</CardTitle>
            <div className={`rounded-full p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className={`text-xs ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
