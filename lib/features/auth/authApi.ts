// import { baseApi } from "../api/baseApi"

import { baseApi } from "../../api/baseApi"


interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  status: boolean
  message: string
  data: {
    user: {
      _id: string
      name: string
      phone: string
      email: string
      role: string
      area?: string
      address?: string
      balance?: number
      isVerified?: boolean
      profileImage?: string
      referenceCode?: string
      subscription?: string
      hasActiveSubscription?: boolean
      isMealActive?: boolean
    }
    accessToken: string
    refreshToken?: string
  }
}


interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
  vehicleType: "cycle" | "car" | "truck"
  area: string
  address: string
  isverified: boolean
  role: "RIDER"
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi

