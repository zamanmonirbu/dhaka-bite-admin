

import { baseApi } from "../../api/baseApi";

export interface ClientApp {
  _id: string;
  name: string;
  phone?: string | null;
  email: string;
  referenceCode: string;
  referedBy?: string | null;
  isVerified: boolean;
  password: string;
  area: string;
  address: string;
  balance: number;
  role: "USER" | "ADMIN" | "RIDER";
  otp?: string | null;
  otpExpires?: Date | null;
  refreshToken: string;
  subscription: 'basic' | 'standard' | 'premium' | 'none';
  isMealActive: boolean;
  subscriptionStartDate?: Date | null;
  subscriptionEndDate?: Date | null;
  hasActiveSubscription: boolean;
  profileImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientApps: builder.query<ClientApp[], void>({
      query: () => ({ url: "/admin/customer-list", method: "GET" }),
    }),
  }),
});

export const { useGetClientAppsQuery } = clientApi;

