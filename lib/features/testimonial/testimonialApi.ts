import { baseApi } from "@/lib/api/baseApi"

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/review-rating",
    }),

    getTestimonialsUnderApproval: builder.query({
      query: () => "/review-rating/admin-under-approval",
    }),
    
    updateTestimonial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review-rating/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/review-rating/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
useGetTestimonialsUnderApprovalQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi
