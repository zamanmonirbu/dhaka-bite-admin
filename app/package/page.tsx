"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import { Loader2, PlusCircle, Trash2, Edit2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} from "@/lib/features/package/packageApi"
import { DashboardLayout } from "@/dashboard"

interface IMealPackage {
  _id: string;
  packageName: string;
  image: string;
  actualPrice: number;
  discountedPrice: number;
  savings: number;
  createdAt: string;
  updatedAt: string;
}

export default function MealPackageAdmin() {
  const { data, isLoading } = useGetPackagesQuery()
  const packages: IMealPackage[] = data?.data || [];

  const [createPackage] = useCreatePackageMutation()
  const [updatePackage] = useUpdatePackageMutation()
  const [deletePackage] = useDeletePackageMutation()

  const [form, setForm] = useState<{
    packageName: string;
    actualPrice: string;
    discountedPrice: string;
    image: File | null;
  }>({
    packageName: "",
    actualPrice: "",
    discountedPrice: "",
    image: null,
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "image" && files) {
      setForm((prev) => ({ ...prev, image: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("packageName", form.packageName)
    formData.append("actualPrice", form.actualPrice)
    formData.append("discountedPrice", form.discountedPrice)
    if (form.image) formData.append("image", form.image)

    if (editingId) {
      await updatePackage({ id: editingId, data: formData })
    } else {
      await createPackage(formData)
    }

    setForm({ packageName: "", actualPrice: "", discountedPrice: "", image: null })
    setEditingId(null)
  }

  const handleEdit = (item: IMealPackage) => {
    setForm({
      packageName: item.packageName,
      actualPrice: item.actualPrice.toString(),
      discountedPrice: item.discountedPrice.toString(),
      image: null,
    })
    setEditingId(item._id)
  }

  const handleDelete = async (id: string) => {
    await deletePackage(id)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Meal Packages</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 border p-4 rounded-lg"
        >
          <div>
            <Label htmlFor="packageName">Package Name</Label>
            <Input
              id="packageName"
              name="packageName"
              value={form.packageName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="actualPrice">Actual Price</Label>
            <Input
              id="actualPrice"
              name="actualPrice"
              type="number"
              value={form.actualPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="discountedPrice">Discounted Price</Label>
            <Input
              id="discountedPrice"
              name="discountedPrice"
              type="number"
              value={form.discountedPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">
              {editingId ? "Update Package" : "Create Package"}
            </Button>
          </div>
        </form>

        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="animate-spin mx-auto" />
            <p>Loading packages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow-sm bg-white relative"
              >
                <Image
                  src={item.image}
                  alt={item.packageName}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-3">{item.packageName}</h3>
                <p className="text-sm text-gray-600">
                  Price: <s>{item.actualPrice}/-</s> <strong>{item.discountedPrice}/-</strong>
                </p>
                <p className="text-sm text-green-600">You save: {item.savings}/-</p>
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit2 size={16} className="mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

