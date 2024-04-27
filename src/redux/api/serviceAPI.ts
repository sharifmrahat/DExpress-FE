import { IServiceQueryType } from "@/types";
import { baseApi } from "./baseApi";
const SERVICE_URL = "/services";

export const serviceAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}`,
        method: "POST",
        data: data,
      }),
    }),
    allServices: build.query({
      query: (query?: IServiceQueryType) => {
        let url = `${SERVICE_URL}`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IServiceQueryType]) {
            const tempQuery = query[key as keyof IServiceQueryType];
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
    singleService: build.query({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useAllServicesQuery,
  useSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceAPI;
