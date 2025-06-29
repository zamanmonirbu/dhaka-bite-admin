import { baseApi } from "@/lib/api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<any, { page: number; limit: number; status: string }>({
      query: ({ page, limit, status }) => `/payment?page=${page}&limit=${limit}&status=${status}`,
    }),
    updateStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => {
        console.log("Updating status for payment ID:", id, "to", status);
        return {
          url: `/payment/${id}`,
          method: "PUT",
          body: { status },
        };
      },
    }),
  }),
});

export const { useGetPaymentsQuery, useUpdateStatusMutation } = paymentApi;

