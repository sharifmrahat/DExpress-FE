import { baseApi } from "./baseApi";
const LORRY_URL = "/lorries";

export const lorryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLorry: build.mutation({
      query: (data) => ({
        url: `${LORRY_URL}/create-lorry`,
        method: "POST",
        data: data,
      }),
    }),
    allLorries: build.query({
      query: () => ({
        url: `${LORRY_URL}`,
        method: "GET",
      }),
    }),
    updateLorry: build.mutation({
      query: (data) => ({
        url: `${LORRY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    singleLorry: build.query({
      query: (id) => ({
        url: `${LORRY_URL}/${id}`,
        method: "GET",
      }),
    }),
    lorryByCategoryId: build.query({
      query: (id) => ({
        url: `${LORRY_URL}/${id}/category`,
        method: "GET",
      }),
    }),
    deleteLorry: build.mutation({
      query: (id) => ({
        url: `${LORRY_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateLorryMutation,
  useAllLorriesQuery,
  useSingleLorryQuery,
  useLorryByCategoryIdQuery,
  useUpdateLorryMutation,
  useDeleteLorryMutation,
} = lorryApi;
