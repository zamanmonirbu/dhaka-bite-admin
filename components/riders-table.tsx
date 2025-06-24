"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Download,
  RefreshCw,
  MessageSquare,
  MapPin,
  Star,
  Bike,
  Car,
  Truck,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const riders = [
  {
    id: 1,
    name: "Ahmed Hassan",
    phone: "+880 123 456 7896",
    email: "ahmed.hassan@gmail.com",
    area: "Banasree",
    status: "Online",
    vehicle: "Bike",
    rating: 4.9,
    deliveries: 156,
    earnings: 15600,
    joinDate: "2024-01-15",
    lastActive: "2 min ago",
    verified: true,
  },
  {
    id: 2,
    name: "Rashid Khan",
    phone: "+880 123 456 7898",
    email: "rashid.khan@gmail.com",
    area: "Rampura",
    status: "Busy",
    vehicle: "Scooter",
    rating: 4.7,
    deliveries: 89,
    earnings: 8900,
    joinDate: "2024-02-10",
    lastActive: "Active now",
    verified: true,
  },
  {
    id: 3,
    name: "Karim Uddin",
    phone: "+880 123 456 7895",
    email: "karim.uddin@gmail.com",
    area: "Dhanmondi",
    status: "Offline",
    vehicle: "Bike",
    rating: 4.5,
    deliveries: 67,
    earnings: 6700,
    joinDate: "2024-01-20",
    lastActive: "1 hour ago",
    verified: false,
  },
  {
    id: 4,
    name: "Nasir Ahmed",
    phone: "+880 123 456 7897",
    email: "nasir.ahmed@gmail.com",
    area: "Mirpur",
    status: "Online",
    vehicle: "Car",
    rating: 4.8,
    deliveries: 203,
    earnings: 20300,
    joinDate: "2023-12-05",
    lastActive: "Active now",
    verified: true,
  },
  {
    id: 5,
    name: "Sabbir Hossain",
    phone: "+880 123 456 7891",
    email: "sabbir.hossain@gmail.com",
    area: "Gulshan",
    status: "Busy",
    vehicle: "Bike",
    rating: 4.6,
    deliveries: 134,
    earnings: 13400,
    joinDate: "2024-01-08",
    lastActive: "Active now",
    verified: true,
  },
  {
    id: 6,
    name: "Rafiq Islam",
    phone: "+880 123 456 7899",
    email: "rafiq.islam@gmail.com",
    area: "Badda",
    status: "Online",
    vehicle: "Scooter",
    rating: 4.4,
    deliveries: 78,
    earnings: 7800,
    joinDate: "2024-02-15",
    lastActive: "5 min ago",
    verified: true,
  },
  {
    id: 7,
    name: "Monir Rahman",
    phone: "+880 123 456 7812",
    email: "monir.rahman@gmail.com",
    area: "Uttara",
    status: "Online",
    vehicle: "Bike",
    rating: 4.9,
    deliveries: 189,
    earnings: 18900,
    joinDate: "2023-11-20",
    lastActive: "Active now",
    verified: true,
  },
  {
    id: 8,
    name: "Shakil Khan",
    phone: "+880 123 456 7896",
    email: "shakil.khan@gmail.com",
    area: "Wari",
    status: "Offline",
    vehicle: "Bike",
    rating: 4.3,
    deliveries: 45,
    earnings: 4500,
    joinDate: "2024-03-01",
    lastActive: "3 hours ago",
    verified: false,
  },
]

const getVehicleIcon = (vehicle: string) => {
  switch (vehicle.toLowerCase()) {
    case "bike":
      return <Bike className="h-4 w-4" />
    case "scooter":
      return <Bike className="h-4 w-4" />
    case "car":
      return <Car className="h-4 w-4" />
    default:
      return <Truck className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "online":
      return "bg-green-500 hover:bg-green-600"
    case "busy":
      return "bg-yellow-500 hover:bg-yellow-600"
    case "offline":
      return "bg-gray-500 hover:bg-gray-600"
    default:
      return "bg-gray-500 hover:bg-gray-600"
  }
}

export function RidersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [areaFilter, setAreaFilter] = useState("all")
  const [vehicleFilter, setVehicleFilter] = useState("all")

  const filteredRiders = riders.filter((rider) => {
    const matchesSearch =
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm) ||
      rider.area.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || rider.status.toLowerCase() === statusFilter
    const matchesArea = areaFilter === "all" || rider.area.toLowerCase() === areaFilter
    const matchesVehicle = vehicleFilter === "all" || rider.vehicle.toLowerCase() === vehicleFilter
    return matchesSearch && matchesStatus && matchesArea && matchesVehicle
  })

  return (
    <Card className="border-[#b0ceb1]/20">
      <CardContent className="p-6">
        {/* Filters and Actions */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="w-[180px] bg-[#b0ceb1] border-[#b0ceb1] text-white">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="banasree">Banasree</SelectItem>
                <SelectItem value="rampura">Rampura</SelectItem>
                <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                <SelectItem value="mirpur">Mirpur</SelectItem>
                <SelectItem value="gulshan">Gulshan</SelectItem>
                <SelectItem value="badda">Badda</SelectItem>
                <SelectItem value="uttara">Uttara</SelectItem>
              </SelectContent>
            </Select>

            <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
              <SelectTrigger className="w-[180px] bg-[#b0ceb1] border-[#b0ceb1] text-white">
                <SelectValue placeholder="Vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="scooter">Scooter</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#b0ceb1] border-[#b0ceb1] text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
              <Input
                placeholder="Search riders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#b0ceb1] border-[#b0ceb1] text-white placeholder:text-white/70"
              />
            </div>

            <Button variant="outline" size="icon" className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="border-[#016102] text-[#016102] hover:bg-[#eaf6ec]">
                <MapPin className="h-4 w-4 mr-2" />
                Track All
              </Button>
            </div>
            <div className="text-sm text-[#777980]">
              Showing {filteredRiders.length} of {riders.length} riders
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border border-[#b0ceb1]/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#eaf6ec]/50">
                <TableHead className="text-[#1d1f2c] font-semibold">Rider</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Contact</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Area</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Vehicle</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Rating</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Deliveries</TableHead>
                <TableHead className="text-[#1d1f2c] font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRiders.map((rider) => (
                <TableRow key={rider.id} className="hover:bg-[#eaf6ec]/30">
                  <TableCell className="font-medium text-[#1d1f2c]">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-[#016102] flex items-center justify-center text-white text-sm font-medium">
                          {rider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        {rider.verified && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{rider.name}</div>
                        <div className="text-xs text-[#777980]">{rider.lastActive}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#777980]">
                    <div>
                      <div>{rider.phone}</div>
                      <div className="text-xs">{rider.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#777980]">{rider.area}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[#777980]">
                      {getVehicleIcon(rider.vehicle)}
                      <span>{rider.vehicle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-[#777980]">{rider.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#777980]">{rider.deliveries}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#eaf6ec]">
                        <Eye className="h-4 w-4 text-[#016102]" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#eaf6ec]">
                        <MessageSquare className="h-4 w-4 text-[#777980]" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#eaf6ec]">
                        <MapPin className="h-4 w-4 text-[#016102]" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#eaf6ec]">
                            <MoreHorizontal className="h-4 w-4 text-[#777980]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-orange-600">Disable Rider</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Rider
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-[#777980]">Page 1 of 1</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="border-[#b0ceb1]">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-[#b0ceb1] bg-[#016102] text-white">
              1
            </Button>
            <Button variant="outline" size="sm" disabled className="border-[#b0ceb1]">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
