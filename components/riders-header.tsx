import { Search, Bell, Plus, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function RidersHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#b0ceb1]/20 bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-[#1d1f2c]">Riders</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777980]" />
          <Input placeholder="Search riders..." className="w-80 pl-10 border-[#b0ceb1] focus:border-[#016102]" />
        </div>

        <Button className="bg-[#016102] hover:bg-[#016102]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Rider
        </Button>

        <Button variant="outline" className="border-[#016102] text-[#016102] hover:bg-[#eaf6ec]">
          <MapPin className="h-4 w-4 mr-2" />
          Map View
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-[#eaf6ec]">
          <Bell className="h-4 w-4 text-[#777980]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-[#eaf6ec]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&query=user+avatar" />
                <AvatarFallback className="bg-[#016102] text-white">MR</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-sm font-medium text-[#1d1f2c]">Mr. Raja</div>
                <div className="text-xs text-[#777980]">User</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
