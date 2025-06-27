"use client"

import { useState } from "react"
import Image from "next/image"
import {
  useCreateHeroImageMutation,
  useDeleteHeroImageMutation,
  useGetHeroImagesQuery,
  useUpdateHeroImageMutation,
} from "@/lib/features/ui/uiApi"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Trash2, Edit } from "lucide-react"

interface HeroImageManageProps {}

const HeroImageManage: React.FC<HeroImageManageProps> = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<any>(null)
  
  const [createHeroImage, { isLoading: isCreating }] = useCreateHeroImageMutation()
  const { data, isLoading: isFetching, refetch } = useGetHeroImagesQuery()
  const [updateHeroImage, { isLoading: isUpdating }] = useUpdateHeroImageMutation()
  const [deleteHeroImage, { isLoading: isDeleting }] = useDeleteHeroImageMutation()

  const heroImages = data?.data || []

  const handleCreateHeroImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    
    try {
      await createHeroImage(formData).unwrap()
      toast({
        title: "Success",
        description: "Hero image created successfully",
        variant: "default",
      })
      setIsCreateModalOpen(false)
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create hero image",
        variant: "destructive",
      })
    }
  }

  const handleUpdateHeroImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    
    try {
      await updateHeroImage({
        _id: currentImage._id,
        data: formData
      }).unwrap()
      toast({
        title: "Success",
        description: "Hero image updated successfully",
        variant: "default",
      })
      setIsEditModalOpen(false)
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero image",
        variant: "destructive",
      })
    }
  }

  const handleDeleteHeroImage = async (heroImage: any) => {
    if (!confirm("Are you sure you want to delete this hero image?")) return
    
    try {
      await deleteHeroImage({ _id: heroImage._id }).unwrap()
      toast({
        title: "Success",
        description: "Hero image deleted successfully",
        variant: "default",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hero image",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (heroImage: any) => {
    setCurrentImage(heroImage)
    setIsEditModalOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Create Button */}
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Add New Hero Image
        </Button>
      </div>

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Hero Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateHeroImage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" required />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Hero Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateHeroImage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title" 
                name="title" 
                defaultValue={currentImage?.title} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image</Label>
              <Input id="edit-image" name="image" type="file" accept="image/*" />
              {currentImage?.image && (
                <div className="mt-2">
                  <Label>Current Image:</Label>
                  <Image
                    src={currentImage.image}
                    alt={currentImage.title}
                    width={200}
                    height={100}
                    className="object-cover rounded-md border mt-1"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hero Images List */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Images</CardTitle>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : heroImages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hero images available. Create your first hero image.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroImages.map((heroImage) => (
                  <TableRow key={heroImage._id}>
                    <TableCell>
                      <div className="relative w-32 h-20">
                        <Image
                          src={heroImage.image}
                          alt={heroImage.title}
                          fill
                          className="object-cover rounded-md border"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {heroImage.title}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditModal(heroImage)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteHeroImage(heroImage)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default HeroImageManage