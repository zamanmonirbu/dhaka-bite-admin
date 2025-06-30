"use client"

import type * as React from "react"
import { LayoutDashboard, Users, Bike, Utensils, Settings, FileText, ShoppingBag, LogOut, Camera,Package2Icon, Ham, DollarSign } from "lucide-react"




import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Riders",
    url: "/riders",
    icon: Bike,
  },
  {
    title: "Meals",
    url: "/meal",
    icon: Ham,
  },
  {
    title: "Financials",
    url: "/finance",
    icon: DollarSign,
  },
  
  {
    title: "Delivery Areas",
    url: "/delivery-areas",
    icon: Settings,
  },
  {
    title: "Testimonials",
    url: "/testimonials",
    icon: FileText,
  },
  {
    title: "Packages",
    url: "/package",
    icon: Package2Icon,
  },
  {
    title: "Others Service",
    url: "/others-service",
    icon: Settings,
  },
  {
    title: "Manage UI",
    url: "/manage-ui",
    icon: Camera,
  },

  {
    title: "Blogs",
    url: "/blogs",
    icon: FileText,
  },
  {
    title: "Order Details",
    url: "/orders",
    icon: ShoppingBag,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props} className="border-r-0">
      <SidebarHeader className="border-b border-[#b0ceb1]/20 pb-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#016102]">
            <Utensils className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#016102]">FoodDelivery</span>
            <span className="text-xs text-[#777980]">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#eaf6ec]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="data-[active=true]:bg-[#016102] data-[active=true]:text-white hover:bg-[#b0ceb1] text-[#1d1f2c]"
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#b0ceb1]/20 bg-[#eaf6ec]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-[#b0ceb1]">
                  <LogOut className="h-4 w-4 text-[#777980]" />
                  <span className="text-[#1d1f2c]">Log out</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
