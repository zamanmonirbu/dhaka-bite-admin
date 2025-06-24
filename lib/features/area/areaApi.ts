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
    }),
    updateArea: builder.mutation<void, UpdateAreaInput>({
      query: (input) => ({
        url: `/delivery-area/${input._id}`,
        method: "PATCH",
        body: input,
      }),
    }),
    deleteArea: builder.mutation<void, DeleteAreaInput>({
      query: (input) => ({
        url: `/delivery-area/${input._id}`,
        method: "DELETE",
      }),
    }),
    getAreas: builder.query<Area[], void>({
      query: () => "/delivery-area",
    }),
  }),
})

export const {
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
  useGetAreasQuery,
} = areaApi

