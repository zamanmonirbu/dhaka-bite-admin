"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useGetAreasQuery } from "@/lib/features/area/areaApi"
import { useRegisterMutation } from "@/lib/features/auth/authApi"

const AddRiderManager = () => {
  const { data } = useGetAreasQuery()
  const areas = data?.data || []

  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vehicleType: "cycle",
    area: "",
    address: "",
    isverified: true,
    role: "RIDER",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await register(formData).unwrap()
      alert("Rider created successfully")
      setIsOpen(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        vehicleType: "cycle",
        area: "",
        address: "",
        isverified: true,
        role: "RIDER",
      })
    } catch (err: any) {
      console.error("Error creating rider:", err)
      alert(err?.data?.message || "Failed to create rider")
    }
  }

  return (
    <div className="p-6">
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold"
      >
        Add Rider
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
            {/* Close */}
            <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create New Rider</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="cycle">Cycle</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="other">Other</option>
              </select>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option value={area._id} key={area._id}>
                    {area.areaName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="address"
                required
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="md:col-span-2 border rounded-md p-2"
              />
              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Rider"}
                </button>
              </div>
            </form>
            {isError && <p className="text-red-600 mt-2">Failed to create rider. Please check input.</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddRiderManager
