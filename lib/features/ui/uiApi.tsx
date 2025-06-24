import { baseApi } from "@/lib/api/baseApi"

export type CreateHeroImageInput = {
  title: string
  image: string
}

export type UpdateHeroImageInput = {
  _id: string
  title?: string
  image?: string
}

export type DeleteHeroImageInput = {
  _id: string
}

export type HeroImage = {
  _id: string
  title: string
  image: string
}

export const uiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHeroImage: builder.mutation<void, CreateHeroImageInput>({
      query: (input) => ({
        url: `/hero-image`,
        method: "POST",
        body: input,
      }),
    }),
    updateHeroImage: builder.mutation<void, UpdateHeroImageInput>({
      query: (input) => ({
        url: `/hero-image/${input._id}`,
        method: "PATCH",
        body: input,
      }),
    }),
    deleteHeroImage: builder.mutation<void, DeleteHeroImageInput>({
      query: (input) => ({
        url: `/hero-image/${input._id}`,
        method: "DELETE",
      }),
    }),
    getHeroImages: builder.query<HeroImage[], void>({
      query: () => "/hero-image",
    }),
  }),
})

export const {
  useCreateHeroImageMutation,
  useUpdateHeroImageMutation,
  useDeleteHeroImageMutation,
  useGetHeroImagesQuery,
} = uiApi

