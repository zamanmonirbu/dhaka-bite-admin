import DeliveryAreaManager from '@/components/DeliveryAreaManager'
import HeroImageManage from '@/components/hero-image-manage'
import { DashboardLayout } from '@/dashboard'
import React from 'react'

export default function page() {
  return (
        <DashboardLayout>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Manage UI
              </h2>
              <p className="text-muted-foreground">
                Manage UI images that are used in the application. UI images include hero images, logos, and other images that are used in the application.
              </p>
            </div>
    
            <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
              <HeroImageManage />
            </div>
            <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
            <DeliveryAreaManager />
            </div>
    
          </div>
        </DashboardLayout>
  )
}
