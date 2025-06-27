import { baseApi } from "@/lib/api/baseApi";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface IMeal {
  name: string;
  time: string;
  foodPackage: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  price: number;
  availability: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  deliveryCharges?: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const mealApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeals: builder.query<IMeal[], void>({
      query: () => "/meals",
      providesTags: ["Meal"],
    }),
    getMealById: builder.query<IMeal, string>({
      query: (id) => `/meals/${id}`,
      providesTags: ["Meal"],
    }),
    addMeal: builder.mutation<IMeal, Partial<IMeal>>({
      query: (newMeal) => ({
        url: "/meals",
        method: "POST",
        body: newMeal,
      }),
      invalidatesTags: ["Meal"],
    }),
    updateMeal: builder.mutation<IMeal, { id: string; data: Partial<IMeal> }>({
      query: ({ id, data }) => ({
        url: `/meals/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Meal"],
    }),
    deleteMeal: builder.mutation<void, string>({
      query: (id) => ({
        url: `/meals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meal"],
    }),
  }),
});

export const {
  useGetMealsQuery,
  useGetMealByIdQuery,
  useAddMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = mealApi;
