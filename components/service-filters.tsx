"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, RotateCcw } from "lucide-react"

interface ServiceFiltersProps {
  onPackageFilter: (value: string) => void
  onDayFilter: (value: string) => void
  onSearch: (value: string) => void
}

export function ServiceFilters({ onPackageFilter, onDayFilter, onSearch }: ServiceFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select onValueChange={onPackageFilter}>
        <SelectTrigger className="w-[200px] bg-[#b0ceb1] border-[#b0ceb1] text-white">
          <SelectValue placeholder="Select Package" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Packages</SelectItem>
          <SelectItem value="basic">Basic Package</SelectItem>
          <SelectItem value="standard">Standard Package</SelectItem>
          <SelectItem value="premium">Premium Package</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onDayFilter}>
        <SelectTrigger className="w-[200px] bg-[#b0ceb1] border-[#b0ceb1] text-white">
          <SelectValue placeholder="Select Day" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Days</SelectItem>
          <SelectItem value="sunday">Sunday</SelectItem>
          <SelectItem value="monday">Monday</SelectItem>
          <SelectItem value="tuesday">Tuesday</SelectItem>
          <SelectItem value="wednesday">Wednesday</SelectItem>
          <SelectItem value="thursday">Thursday</SelectItem>
          <SelectItem value="friday">Friday</SelectItem>
          <SelectItem value="saturday">Saturday</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative flex-1 min-w-[250px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
        <Input
          placeholder="Search menus..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-[#b0ceb1] border-[#b0ceb1] text-white placeholder:text-white/70"
        />
      </div>

      <Button variant="outline" size="icon" className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
        <Filter className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  )
}
