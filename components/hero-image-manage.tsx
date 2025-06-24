"use client"

import {
  useCreateHeroImageMutation,
  useDeleteHeroImageMutation,
  useGetHeroImagesQuery,
  useUpdateHeroImageMutation,
} from "@/lib/features/ui/uiApi"

interface HeroImageManageProps {}

const HeroImageManage: React.FC<HeroImageManageProps> = () => {
  const [createHeroImage, { isLoading: isCreating }] = useCreateHeroImageMutation()
  const { data, isLoading: isFetching } = useGetHeroImagesQuery()
  const [updateHeroImage] = useUpdateHeroImageMutation()
  const [deleteHeroImage] = useDeleteHeroImageMutation()

  const heroImages = data?.data || []

  const handleCreateHeroImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await createHeroImage(formData)
    event.currentTarget.reset()
  }

  const handleDeleteHeroImage = async (heroImage: HeroImage) => {
    const { _id } = heroImage
    await deleteHeroImage({ _id })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Form Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Add New Hero Image</h2>
        <form onSubmit={handleCreateHeroImage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" name="title" required className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" name="image" accept="image/*" required className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create Hero Image"}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Hero Images List</h2>
        {heroImages.length === 0 ? (
          <p className="text-gray-500 text-center">No hero images available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {heroImages.map((heroImage) => (
                  <tr key={heroImage._id}>
                    <td className="px-4 py-2">
                      <img src={heroImage.image} alt={heroImage.title} className="w-20 h-20 object-cover rounded-md border" />
                    </td>
                    <td className="px-4 py-2 text-gray-800">{heroImage.title}</td>
                    <td className="px-4 py-2 space-x-2">
                      {/* Update can be handled with a modal or inline form */}
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-1 rounded"
                        onClick={() => alert("Update feature not implemented yet")}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1 rounded"
                        onClick={() => handleDeleteHeroImage(heroImage)}
                      >
                        Delete
                      </button>
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

export default HeroImageManage
