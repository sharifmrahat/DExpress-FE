import { IPackageQueryType } from "@/types";
import { baseApi } from "./baseApi";
const PACKAGE_URL = "/packages";

export const packageAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPackage: build.mutation({
      query: (data) => ({
        url: `${PACKAGE_URL}`,
        method: "POST",
        data: data,
      }),
    }),
    allPackages: build.query({
      query: (query?: IPackageQueryType) => {
        let url = `${PACKAGE_URL}`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IPackageQueryType]) {
            const tempQuery = query[key as keyof IPackageQueryType];
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
    singlePackage: build.query({
      query: (id) => ({
        url: `${PACKAGE_URL}/${id}`,
        method: "GET",
      }),
    }),
    updatePackage: build.mutation({
      query: (data) => ({
        url: `${PACKAGE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deletePackage: build.mutation({
      query: (id) => ({
        url: `${PACKAGE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useAllPackagesQuery,
  useSinglePackageQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageAPI;
