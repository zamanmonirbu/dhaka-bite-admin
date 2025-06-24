"use client"

import { useState } from "react"
import {
  useCreateAreaMutation,
  useDeleteAreaMutation,
  useGetAreasQuery,
  useUpdateAreaMutation,
} from "@/lib/features/area/areaApi"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("./LocationPickerMap"), { ssr: false })

interface DeliveryArea {
  _id: string
  areaName: string
  latitude: number
  longitude: number
  radius: number
}

const DeliveryAreaManager = () => {
  const { data, isLoading } = useGetAreasQuery()
  const [createArea] = useCreateAreaMutation()
  const [updateArea] = useUpdateAreaMutation()
  const [deleteArea] = useDeleteAreaMutation()

  const deliveryAreas = data?.data || []

  console.log("Delivery Areas:", deliveryAreas)

  const [formData, setFormData] = useState({
    areaName: "",
    latitude: "",
    longitude: "",
    radius: "",
  })

  // New state for syncing position with map marker
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null)

  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<DeliveryArea>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Sync marker if latitude or longitude changes manually
    if (name === "latitude" || name === "longitude") {
      const lat = name === "latitude" ? parseFloat(value) : parseFloat(formData.latitude)
      const lng = name === "longitude" ? parseFloat(value) : parseFloat(formData.longitude)

      if (!isNaN(lat) && !isNaN(lng)) {
        setSelectedPosition({ lat, lng })
      }
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    await createArea({
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      radius: parseFloat(formData.radius),
    })
    setFormData({ areaName: "", latitude: "", longitude: "", radius: "" })
    setSelectedPosition(null)
  }

  const handleEditClick = (area: DeliveryArea) => {
    setEditId(area._id)
    setEditData(area)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (id: string) => {
    await updateArea({
      id,
      ...editData,
      latitude: parseFloat(editData.latitude as any),
      longitude: parseFloat(editData.longitude as any),
      radius: parseFloat(editData.radius as any),
    })
    setEditId(null)
    setEditData({})
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this area?")) {
      await deleteArea({ id })
    }
  }

  // When user clicks map, update formData and marker position
  const handleMapClick = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }))
    setSelectedPosition({ lat, lng })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Create Area Form */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow border grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="text-xl font-semibold md:col-span-2">Create Delivery Area</h2>
        <input
          type="text"
          name="areaName"
          required
          placeholder="Area Name"
          value={formData.areaName}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          name="radius"
          required
          placeholder="Radius (meters)"
          value={formData.radius}
          onChange={handleChange}
          className="border rounded-md p-2"
        />

        <input
          type="number"
          name="latitude"
          required
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          name="longitude"
          required
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="border rounded-md p-2"
        />

        <div className="md:col-span-2 h-[300px]">
          <Map onMapClick={handleMapClick} selectedPosition={selectedPosition} />
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Create Area
          </button>
        </div>
      </form>

      {/* Delivery Areas Table */}
      <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-semibold mb-4">All Delivery Areas</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2 text-left">Area Name</th>
                  <th className="border px-4 py-2 text-left">Latitude</th>
                  <th className="border px-4 py-2 text-left">Longitude</th>
                  <th className="border px-4 py-2 text-left">Radius</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveryAreas.map((area: DeliveryArea) => (
                  <tr key={area._id} className="border-t">
                    <td className="px-4 py-2">
                      {editId === area._id ? (
                        <input
                          name="areaName"
                          value={editData.areaName || ""}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        area.areaName
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editId === area._id ? (
                        <input
                          name="latitude"
                          type="number"
                          value={editData.latitude || ""}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        area.latitude.toFixed(2)
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editId === area._id ? (
                        <input
                          name="longitude"
                          type="number"
                          value={editData.longitude || ""}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        area.longitude.toFixed(2)
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editId === area._id ? (
                        <input
                          name="radius"
                          type="number"
                          value={editData.radius || ""}
                          onChange={handleEditChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        area.radius
                      )}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      {editId === area._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(area._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(area)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(area._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveryAreaManager
