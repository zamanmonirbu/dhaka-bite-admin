"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

interface AddServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (serviceData: any) => void
}

export function AddServiceModal({ isOpen, onClose, onSave }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
  })
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!formData.title || !formData.category || !formData.price) {
      alert("Please fill in all required fields")
      return
    }

    const serviceData = {
      ...formData,
      image: uploadedImage,
      id: `${formData.category}-${Date.now()}`,
    }

    onSave(serviceData)
    handleReset()
    onClose()
  }

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      price: "",
    })
    setUploadedImage(null)
    setImagePreview("")
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1d1f2c]">Add New Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#1d1f2c] font-medium">
                Service Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter service title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="border-[#b0ceb1] focus:border-[#016102]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#1d1f2c] font-medium">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="border-[#b0ceb1] focus:border-[#016102]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold-drinks">Cold Drinks</SelectItem>
                  <SelectItem value="fast-food">Fast Food</SelectItem>
                  <SelectItem value="catering">Catering Service</SelectItem>
                  <SelectItem value="snacks">Snacks & Combos</SelectItem>
                  <SelectItem value="desserts">Desserts</SelectItem>
                  <SelectItem value="beverages">Hot Beverages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-[#1d1f2c] font-medium">
              Price *
            </Label>
            <div className="relative">
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="border-[#b0ceb1] focus:border-[#016102] pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777980]">/-</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#1d1f2c] font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter service description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border-[#b0ceb1] focus:border-[#016102] min-h-[100px]"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-[#1d1f2c] font-medium">Service Image</Label>
            <div className="border-2 border-dashed border-[#b0ceb1] rounded-lg p-8">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setUploadedImage(null)
                      setImagePreview("")
                    }}
                    className="w-full border-[#b0ceb1] hover:bg-[#eaf6ec]"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-12 w-12 text-[#777980] mx-auto mb-4" />
                  <p className="text-[#777980] mb-4">Upload Service Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="service-image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("service-image-upload")?.click()}
                    className="border-[#b0ceb1] hover:bg-[#eaf6ec]"
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={handleClose} className="border-[#b0ceb1] hover:bg-[#eaf6ec]">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#016102] hover:bg-[#016102]/90 text-white px-8">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
