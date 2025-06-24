"use client"

import { useState } from "react"
import { ServiceFilters } from "./service-filters"
import { MenuCard } from "./menu-card"

const menuData = [
  // Basic Package - 7 Days
  {
    id: "basic-sunday",
    name: "Sunday Special",
    package: "basic",
    day: "Sunday",
    price: 65,
    image: "/placeholder.svg?height=200&width=300&query=bengali+rice+fish+curry",
    items: ["Rice", "Fish Curry", "Vegetables", "Lentils"],
    rating: 4.2,
  },
  {
    id: "basic-monday",
    name: "Monday Meal",
    package: "basic",
    day: "Monday",
    price: 60,
    image: "/placeholder.svg?height=200&width=300&query=rice+chicken+vegetables",
    items: ["Rice", "Chicken", "Mixed Vegetables", "Dal"],
  },
  {
    id: "basic-tuesday",
    name: "Tuesday Treat",
    package: "basic",
    day: "Tuesday",
    price: 65,
    image: "/placeholder.svg?height=200&width=300&query=rice+beef+curry+vegetables",
    items: ["Rice", "Beef Curry", "Cabbage", "Lentils"],
  },
  {
    id: "basic-wednesday",
    name: "Wednesday Wonder",
    package: "basic",
    day: "Wednesday",
    price: 60,
    image: "/placeholder.svg?height=200&width=300&query=rice+egg+curry+spinach",
    items: ["Rice", "Egg Curry", "Spinach", "Dal"],
  },
  {
    id: "basic-thursday",
    name: "Thursday Thali",
    package: "basic",
    day: "Thursday",
    price: 65,
    image: "/placeholder.svg?height=200&width=300&query=rice+fish+fry+vegetables",
    items: ["Rice", "Fish Fry", "Potato Curry", "Lentils"],
  },
  {
    id: "basic-friday",
    name: "Friday Feast",
    package: "basic",
    day: "Friday",
    price: 70,
    image: "/placeholder.svg?height=200&width=300&query=rice+mutton+curry+vegetables",
    items: ["Rice", "Mutton Curry", "Vegetables", "Dal"],
    isPopular: true,
    rating: 4.5,
  },
  {
    id: "basic-saturday",
    name: "Saturday Special",
    package: "basic",
    day: "Saturday",
    price: 65,
    image: "/placeholder.svg?height=200&width=300&query=rice+chicken+roast+vegetables",
    items: ["Rice", "Chicken Roast", "Mixed Vegetables", "Lentils"],
  },

  // Standard Package - 7 Days
  {
    id: "standard-sunday",
    name: "Premium Sunday",
    package: "standard",
    day: "Sunday",
    price: 95,
    image: "/placeholder.svg?height=200&width=300&query=biryani+chicken+raita+salad",
    items: ["Chicken Biryani", "Raita", "Salad", "Sweet"],
    isPopular: true,
    rating: 4.7,
  },
  {
    id: "standard-monday",
    name: "Monday Deluxe",
    package: "standard",
    day: "Monday",
    price: 85,
    image: "/placeholder.svg?height=200&width=300&query=rice+fish+curry+vegetables+sweet",
    items: ["Rice", "Fish Curry", "Vegetables", "Dal", "Sweet"],
  },
  {
    id: "standard-tuesday",
    name: "Tuesday Premium",
    package: "standard",
    day: "Tuesday",
    price: 90,
    image: "/placeholder.svg?height=200&width=300&query=rice+beef+curry+vegetables+salad",
    items: ["Rice", "Beef Curry", "Vegetables", "Lentils", "Salad"],
  },
  {
    id: "standard-wednesday",
    name: "Wednesday Deluxe",
    package: "standard",
    day: "Wednesday",
    price: 85,
    image: "/placeholder.svg?height=200&width=300&query=rice+chicken+curry+vegetables+sweet",
    items: ["Rice", "Chicken Curry", "Vegetables", "Dal", "Sweet"],
  },
  {
    id: "standard-thursday",
    name: "Thursday Premium",
    package: "standard",
    day: "Thursday",
    price: 90,
    image: "/placeholder.svg?height=200&width=300&query=rice+fish+fry+vegetables+salad",
    items: ["Rice", "Fish Fry", "Vegetables", "Lentils", "Salad"],
  },
  {
    id: "standard-friday",
    name: "Friday Special",
    package: "standard",
    day: "Friday",
    price: 100,
    image: "/placeholder.svg?height=200&width=300&query=mutton+biryani+raita+sweet",
    items: ["Mutton Biryani", "Raita", "Salad", "Sweet"],
    isPopular: true,
    rating: 4.8,
  },
  {
    id: "standard-saturday",
    name: "Saturday Deluxe",
    package: "standard",
    day: "Saturday",
    price: 95,
    image: "/placeholder.svg?height=200&width=300&query=rice+chicken+roast+vegetables+sweet",
    items: ["Rice", "Chicken Roast", "Vegetables", "Dal", "Sweet"],
  },

  // Premium Package - 7 Days
  {
    id: "premium-sunday",
    name: "Royal Sunday",
    package: "premium",
    day: "Sunday",
    price: 150,
    image: "/placeholder.svg?height=200&width=300&query=royal+biryani+kebab+sweet+salad",
    items: ["Royal Biryani", "Kebab", "Raita", "Salad", "Sweet", "Drink"],
    isPopular: true,
    rating: 4.9,
  },
  {
    id: "premium-monday",
    name: "Monday Royal",
    package: "premium",
    day: "Monday",
    price: 130,
    image: "/placeholder.svg?height=200&width=300&query=rice+fish+curry+vegetables+sweet+salad",
    items: ["Rice", "Fish Curry", "Vegetables", "Dal", "Sweet", "Salad"],
  },
  {
    id: "premium-tuesday",
    name: "Tuesday Royal",
    package: "premium",
    day: "Tuesday",
    price: 140,
    image: "/placeholder.svg?height=200&width=300&query=rice+beef+curry+vegetables+sweet+drink",
    items: ["Rice", "Beef Curry", "Vegetables", "Lentils", "Sweet", "Drink"],
  },
  {
    id: "premium-wednesday",
    name: "Wednesday Royal",
    package: "premium",
    day: "Wednesday",
    price: 135,
    image: "/placeholder.svg?height=200&width=300&query=rice+chicken+curry+vegetables+sweet+salad",
    items: ["Rice", "Chicken Curry", "Vegetables", "Dal", "Sweet", "Salad"],
  },
  {
    id: "premium-thursday",
    name: "Thursday Royal",
    package: "premium",
    day: "Thursday",
    price: 140,
    image: "/placeholder.svg?height=200&width=300&query=rice+fish+fry+vegetables+sweet+drink",
    items: ["Rice", "Fish Fry", "Vegetables", "Lentils", "Sweet", "Drink"],
  },
  {
    id: "premium-friday",
    name: "Friday Royal",
    package: "premium",
    day: "Friday",
    price: 160,
    image: "/placeholder.svg?height=200&width=300&query=royal+mutton+biryani+kebab+sweet",
    items: ["Royal Mutton Biryani", "Kebab", "Raita", "Salad", "Sweet", "Drink"],
    isPopular: true,
    rating: 5.0,
  },
  {
    id: "premium-saturday",
    name: "Saturday Royal",
    package: "premium",
    day: "Saturday",
    price: 145,
    image: "/placeholder.svg?height=200&width=300&query=rice+chicken+roast+vegetables+sweet+salad",
    items: ["Rice", "Chicken Roast", "Vegetables", "Dal", "Sweet", "Salad"],
  },
]

export function ServiceContent() {
  const [filteredMenus, setFilteredMenus] = useState(menuData)
  const [packageFilter, setPackageFilter] = useState("all")
  const [dayFilter, setDayFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handlePackageFilter = (value: string) => {
    setPackageFilter(value)
    applyFilters(value, dayFilter, searchTerm)
  }

  const handleDayFilter = (value: string) => {
    setDayFilter(value)
    applyFilters(packageFilter, value, searchTerm)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    applyFilters(packageFilter, dayFilter, value)
  }

  const applyFilters = (pkg: string, day: string, search: string) => {
    let filtered = menuData

    if (pkg !== "all") {
      filtered = filtered.filter((menu) => menu.package === pkg)
    }

    if (day !== "all") {
      filtered = filtered.filter((menu) => menu.day.toLowerCase() === day)
    }

    if (search) {
      filtered = filtered.filter(
        (menu) =>
          menu.name.toLowerCase().includes(search.toLowerCase()) ||
          menu.items.some((item) => item.toLowerCase().includes(search.toLowerCase())),
      )
    }

    setFilteredMenus(filtered)
  }

  const handleEdit = (id: string) => {
    // Find the menu to edit
    const menuToEdit = menuData.find((menu) => menu.id === id)
    if (menuToEdit) {
      // You can pass the menu data to the modal for editing
      console.log("Edit menu:", menuToEdit)
      // For now, we'll just log it. You can extend this to open the modal with pre-filled data
    }
  }

  const handleDelete = (id: string) => {
    console.log("Delete menu:", id)
  }

  const groupedMenus = filteredMenus.reduce(
    (acc, menu) => {
      if (!acc[menu.package]) {
        acc[menu.package] = []
      }
      acc[menu.package].push(menu)
      return acc
    },
    {} as Record<string, typeof menuData>,
  )

  return (
    <div className="space-y-6">
      <ServiceFilters onPackageFilter={handlePackageFilter} onDayFilter={handleDayFilter} onSearch={handleSearch} />

      {Object.entries(groupedMenus).map(([packageType, menus]) => (
        <div key={packageType} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1d1f2c] capitalize">
              {packageType} Package ({menus.length} menus)
            </h2>
            <div className="text-sm text-[#777980]">
              Price range: ৳{Math.min(...menus.map((m) => m.price))} - ৳{Math.max(...menus.map((m) => m.price))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      ))}

      {filteredMenus.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[#777980] text-lg">No menus found matching your criteria</div>
          <div className="text-sm text-[#777980] mt-2">Try adjusting your filters or search terms</div>
        </div>
      )}
    </div>
  )
}
