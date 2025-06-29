"use client"

import React from "react"
import {
  useGetTestimonialsUnderApprovalQuery,
  useDeleteTestimonialMutation,
  useUpdateTestimonialMutation,
} from "@/lib/features/testimonial/testimonialApi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2, Edit } from "lucide-react"

export default function ReviewRating() {
  const { data, isLoading, isError } = useGetTestimonialsUnderApprovalQuery()
  const [deleteTestimonial] = useDeleteTestimonialMutation()
  const [updateTestimonial] = useUpdateTestimonialMutation()

  const reviews = data?.data || []

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id)
  }

  const handleApprove = async (testimonial: any) => {
    await updateTestimonial({
  id: testimonial._id,
  data: { ...testimonial, accepted: true },
})

  }

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (isError) return <div className="text-center text-red-500 py-8">Failed to fetch data.</div>

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Pending Reviews</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="text-left">User</TableHead>
              <TableHead className="text-left">Review</TableHead>
              <TableHead className="text-left">Rating</TableHead>
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id} className="hover:bg-gray-50">
                <TableCell className="flex items-center gap-3 py-4">
                  <Avatar>
                    <AvatarImage src={review.userId.profileImage || "/placeholder.svg"} />
                    <AvatarFallback>
                      {review.userId.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium text-gray-900">
                    {review.userId.name}
                  </div>
                </TableCell>

                <TableCell className="max-w-sm text-sm text-gray-700">
                  {review.review}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => handleApprove(review)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Approve
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(review._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
