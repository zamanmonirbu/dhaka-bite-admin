import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardInfo: builder.query({
      query: () => ({
        url: "/admin/dashboard-info",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardApi;

