"use client"

import { useState } from "react"
import { ServiceCategoryCard } from "./service-category-card"

const serviceCategories = [
  {
    id: "cold-drinks",
    title: "Cold Drinks",
    image: "/placeholder.svg?height=300&width=400&query=colorful+cold+drinks+bottles+beverages",
    description: "Refreshing cold beverages and soft drinks",
    itemCount: 25,
    isPopular: true,
  },
  {
    id: "fast-food",
    title: "Fast Food",
    image: "/placeholder.svg?height=300&width=400&query=delicious+burger+fast+food",
    description: "Quick and tasty fast food options",
    itemCount: 18,
    isPopular: true,
  },
  {
    id: "catering-service",
    title: "Catering Service",
    image: "/placeholder.svg?height=300&width=400&query=catering+appetizers+party+food",
    description: "Professional catering for events and parties",
    itemCount: 12,
  },
  {
    id: "snacks-combos",
    title: "Snacks & Combos",
    image: "/placeholder.svg?height=300&width=400&query=fried+snacks+combo+platter",
    description: "Delicious snacks and combo meals",
    itemCount: 22,
  },
  {
    id: "desserts",
    title: "Desserts",
    image: "/placeholder.svg?height=300&width=400&query=sweet+desserts+cakes+pastries",
    description: "Sweet treats and desserts",
    itemCount: 15,
  },
  {
    id: "hot-beverages",
    title: "Hot Beverages",
    image: "/placeholder.svg?height=300&width=400&query=hot+coffee+tea+beverages",
    description: "Hot coffee, tea, and other warm drinks",
    itemCount: 10,
  },
  {
    id: "healthy-options",
    title: "Healthy Options",
    image: "/placeholder.svg?height=300&width=400&query=healthy+salad+fresh+food",
    description: "Nutritious and healthy meal options",
    itemCount: 14,
  },
  {
    id: "breakfast",
    title: "Breakfast Special",
    image: "/placeholder.svg?height=300&width=400&query=breakfast+eggs+toast+morning",
    description: "Fresh breakfast items to start your day",
    itemCount: 16,
  },
]

export function OtherServiceContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = serviceCategories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewMore = (categoryId: string) => {
    console.log("View more for category:", categoryId)
    // Here you would navigate to the specific category page
    // or open a modal with category details
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[#1d1f2c]">Service Categories</h2>
          <p className="text-sm text-[#777980] mt-1">
            Showing {filteredCategories.length} of {serviceCategories.length} categories
          </p>
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <ServiceCategoryCard key={category.id} category={category} onViewMore={handleViewMore} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[#777980] text-lg">No service categories found</div>
          <div className="text-sm text-[#777980] mt-2">Try adjusting your search terms</div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 bg-[#eaf6ec]/30 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#016102]">{serviceCategories.length}</div>
          <div className="text-sm text-[#777980]">Total Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#016102]">
            {serviceCategories.reduce((sum, cat) => sum + (cat.itemCount || 0), 0)}
          </div>
          <div className="text-sm text-[#777980]">Total Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#016102]">
            {serviceCategories.filter((cat) => cat.isPopular).length}
          </div>
          <div className="text-sm text-[#777980]">Popular Categories</div>
        </div>
      </div>
    </div>
  )
}
