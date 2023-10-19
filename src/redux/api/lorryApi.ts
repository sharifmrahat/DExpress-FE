import { ILorryQueryType } from "@/types";
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
      query: (query?: ILorryQueryType) => {
        let url = `/lorries`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof ILorryQueryType]) {
            const tempQuery = query[key as keyof ILorryQueryType];
            if (tempQuery) queryArr.push(`${key}=${tempQuery}`);
          }
        }

        if (queryArr.length) {
          url = `${url}?${queryArr.join("&")}`;
        }

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    geLorryByCategoryId: build.query({
      query: (input: { query?: ILorryQueryType; id: string }) => {
        let url = `/lorries/${input.id}/category`;

        const queryArr = [];
        for (const key in input?.query) {
          if (input?.query[key as keyof ILorryQueryType]) {
            const tempQuery = input?.query[key as keyof ILorryQueryType];
            if (tempQuery) queryArr.push(`${key}=${tempQuery}`);
          }
        }

        if (queryArr.length) {
          url = `${url}?${queryArr.join("&")}`;
        }

        return {
          url: url,
          method: "GET",
        };
      },
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
