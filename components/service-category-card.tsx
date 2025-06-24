"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ServiceCategory {
  id: string
  title: string
  image: string
  description?: string
  itemCount?: number
  isPopular?: boolean
}

interface ServiceCategoryCardProps {
  category: ServiceCategory
  onViewMore: (id: string) => void
}

export function ServiceCategoryCard({ category, onViewMore }: ServiceCategoryCardProps) {
  return (
    <Card className="border-[#b0ceb1]/20 hover:shadow-lg transition-all duration-200 overflow-hidden group">
      <div className="relative">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {category.isPopular && <Badge className="absolute top-3 right-3 bg-yellow-500 text-white">Popular</Badge>}
        {category.itemCount && (
          <Badge className="absolute top-3 left-3 bg-[#016102] text-white">{category.itemCount} Items</Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#1d1f2c] mb-2">{category.title}</h3>
            {category.description && <p className="text-sm text-[#777980]">{category.description}</p>}
          </div>

          <Button
            onClick={() => onViewMore(category.id)}
            className="w-full bg-[#016102] hover:bg-[#016102]/90 text-white"
          >
            View More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
