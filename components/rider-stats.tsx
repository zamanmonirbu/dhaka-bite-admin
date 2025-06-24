import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bike, Users, Clock, Star, TrendingUp, MapPin } from "lucide-react"

const stats = [
  {
    title: "Total Riders",
    value: "156",
    change: "+8",
    changeType: "increase",
    icon: Users,
    color: "text-[#016102]",
    bgColor: "bg-[#eaf6ec]",
    subtitle: "Active riders",
  },
  {
    title: "Online Now",
    value: "89",
    change: "57%",
    changeType: "neutral",
    icon: Clock,
    color: "text-[#28a745]",
    bgColor: "bg-green-50",
    subtitle: "Available for delivery",
  },
  {
    title: "On Delivery",
    value: "34",
    change: "+12",
    changeType: "increase",
    icon: Bike,
    color: "text-[#016102]",
    bgColor: "bg-[#eaf6ec]",
    subtitle: "Currently delivering",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    changeType: "increase",
    icon: Star,
    color: "text-[#ebd394]",
    bgColor: "bg-yellow-50",
    subtitle: "Customer satisfaction",
  },
  {
    title: "Deliveries Today",
    value: "247",
    change: "+18%",
    changeType: "increase",
    icon: TrendingUp,
    color: "text-[#016102]",
    bgColor: "bg-[#eaf6ec]",
    subtitle: "Completed orders",
  },
  {
    title: "Coverage Areas",
    value: "12",
    change: "+2",
    changeType: "increase",
    icon: MapPin,
    color: "text-[#777980]",
    bgColor: "bg-gray-50",
    subtitle: "Active zones",
  },
]

export function RiderStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#777980]">{stat.subtitle}</p>
              <p
                className={`text-xs ${stat.changeType === "increase" ? "text-green-600" : stat.changeType === "decrease" ? "text-red-600" : "text-[#777980]"}`}
              >
                {stat.change}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
