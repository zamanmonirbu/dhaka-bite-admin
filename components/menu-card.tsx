"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Check, Star } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  package: string
  day: string
  price: number
  image: string
  items: string[]
  isPopular?: boolean
  rating?: number
}

interface MenuCardProps {
  menu: MenuItem
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const getPackageColor = (packageType: string) => {
  switch (packageType.toLowerCase()) {
    case "basic":
      return "bg-blue-500"
    case "standard":
      return "bg-[#016102]"
    case "premium":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

export function MenuCard({ menu, onEdit, onDelete }: MenuCardProps) {
  return (
    <Card className="border-[#b0ceb1]/20 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <img src={menu.image || "/placeholder.svg"} alt={menu.name} className="w-full h-48 object-cover" />
        <Badge className={`absolute top-2 left-2 ${getPackageColor(menu.package)} text-white`}>{menu.day}</Badge>
        {menu.isPopular && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-[#1d1f2c] text-lg">{menu.name}</h3>
            <p className="text-sm text-[#777980] capitalize">{menu.package} Package</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#016102]">৳{menu.price}</div>
            <div className="text-xs text-[#777980]">Per Meal</div>
          </div>
        </div>

        {menu.rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-[#777980]">{menu.rating}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-4">
          {menu.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-[#777980]">
              <Check className="h-3 w-3 text-[#016102]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-[#016102] hover:bg-[#016102]/90 text-white"
            onClick={() => onEdit(menu.id)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Menu
          </Button>
          <Button size="sm" variant="destructive" className="flex-1" onClick={() => onDelete(menu.id)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
