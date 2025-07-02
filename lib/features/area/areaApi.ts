import { baseApi } from "@/lib/api/baseApi"

export type CreateAreaInput = {
  areaName: string
  latitude: number
  longitude: number
  radius: number
}

export type UpdateAreaInput = {
  _id: string
  areaName?: string
  latitude?: number
  longitude?: number
  radius?: number
}

export type DeleteAreaInput = {
  _id: string
}

export type Area = {
  _id: string
  areaName: string
  latitude: number
  longitude: number
  radius: number
}

export const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createArea: builder.mutation<void, CreateAreaInput>({
      query: (input) => ({
        url: `/delivery-area`,
        method: "POST",
        body: input,
      }),
      invalidatesTags: ['DeliveryArea'], // Add this to refresh the list after creation
    }),
    updateArea: builder.mutation<void, UpdateAreaInput>({
      query: ({ _id, ...input }) => ({
        url: `/delivery-area/${_id}`,
        method: "PUT",
        body: input,
      }),
      invalidatesTags: ['DeliveryArea'], // Add this to refresh the list after update
    }),
    deleteArea: builder.mutation<void, DeleteAreaInput>({
      query: ({ _id }) => ({ // Fixed: destructure _id from input object
        url: `/delivery-area/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['DeliveryArea'], // Add this to refresh the list after deletion
    }),
    getAreas: builder.query<{ data: Area[] }, void>({
      query: () => "/delivery-area",
      providesTags: ['DeliveryArea'], // Add this for caching
    }),
  }),
})

export const {
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
  useGetAreasQuery,
} = areaApi