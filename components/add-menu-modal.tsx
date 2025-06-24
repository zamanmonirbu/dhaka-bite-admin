"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Plus, X } from "lucide-react"

interface AddMenuModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (menuData: any) => void
}

const predefinedItems = [
  "Rice",
  "Fried Rice",
  "Vegetable",
  "Lentils",
  "Beef",
  "Mutton",
  "Chicken",
  "Smash",
  "Chicken Roast",
  "Fish Curry",
  "Egg Curry",
  "Dal",
  "Salad",
  "Sweet",
  "Raita",
  "Kebab",
]

export function AddMenuModal({ isOpen, onClose, onSave }: AddMenuModalProps) {
  const [formData, setFormData] = useState({
    package: "",
    time: "",
    day: "",
    price: "",
    name: "",
  })
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [customItem, setCustomItem] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleAddCustomItem = () => {
    if (customItem.trim() && !selectedItems.includes(customItem.trim())) {
      setSelectedItems((prev) => [...prev, customItem.trim()])
      setCustomItem("")
    }
  }

  const handleRemoveItem = (item: string) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item))
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
    if (!formData.package || !formData.day || !formData.price || selectedItems.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    const menuData = {
      ...formData,
      items: selectedItems,
      image: uploadedImage,
      id: `${formData.package}-${formData.day}-${Date.now()}`,
    }

    onSave(menuData)
    handleReset()
    onClose()
  }

  const handleReset = () => {
    setFormData({
      package: "",
      time: "",
      day: "",
      price: "",
      name: "",
    })
    setSelectedItems([])
    setCustomItem("")
    setUploadedImage(null)
    setImagePreview("")
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1d1f2c]">Add New Menu</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Package and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package" className="text-[#1d1f2c] font-medium">
                Package *
              </Label>
              <Select value={formData.package} onValueChange={(value) => handleInputChange("package", value)}>
                <SelectTrigger className="border-[#b0ceb1] focus:border-[#016102]">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Package</SelectItem>
                  <SelectItem value="standard">Standard Package</SelectItem>
                  <SelectItem value="premium">Premium Package</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-[#1d1f2c] font-medium">
                Time
              </Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                <SelectTrigger className="border-[#b0ceb1] focus:border-[#016102]">
                  <SelectValue placeholder="Choose time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Day and Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day" className="text-[#1d1f2c] font-medium">
                Day *
              </Label>
              <Select value={formData.day} onValueChange={(value) => handleInputChange("day", value)}>
                <SelectTrigger className="border-[#b0ceb1] focus:border-[#016102]">
                  <SelectValue placeholder="Choose day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
          </div>

          {/* Menu Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#1d1f2c] font-medium">
              Menu Name
            </Label>
            <Input
              id="name"
              placeholder="Enter menu name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border-[#b0ceb1] focus:border-[#016102]"
            />
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <Label className="text-[#1d1f2c] font-medium">Items *</Label>

            {/* Predefined Items */}
            <div className="flex flex-wrap gap-2">
              {predefinedItems.map((item) => (
                <Badge
                  key={item}
                  variant={selectedItems.includes(item) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedItems.includes(item)
                      ? "bg-[#016102] hover:bg-[#016102]/90 text-white"
                      : "border-[#b0ceb1] hover:bg-[#eaf6ec] text-[#1d1f2c]"
                  }`}
                  onClick={() => handleItemToggle(item)}
                >
                  {item}
                </Badge>
              ))}
            </div>

            {/* Custom Item Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Add custom item"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                className="border-[#b0ceb1] focus:border-[#016102]"
                onKeyPress={(e) => e.key === "Enter" && handleAddCustomItem()}
              />
              <Button
                type="button"
                onClick={handleAddCustomItem}
                className="bg-[#016102] hover:bg-[#016102]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-[#777980]">Selected Items:</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <Badge key={item} className="bg-[#016102] text-white">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item)}
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-[#1d1f2c] font-medium">Image</Label>
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
                  <p className="text-[#777980] mb-4">Upload Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
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
