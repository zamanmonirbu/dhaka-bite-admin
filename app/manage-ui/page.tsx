import DeliveryAreaManager from '@/components/DeliveryAreaManager'
import HeroImageManage from '@/components/hero-image-manage'
import ReviewRating from '@/components/review-rating'
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
    
              <HeroImageManage />
            <DeliveryAreaManager />
            <ReviewRating />
            {/* <div >
            </div>
            <div >
            </div> */}
    
          </div>
        </DashboardLayout>
  )
}
