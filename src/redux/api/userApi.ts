import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [
        tagTypes.CUSTOMER,
        tagTypes.ADMIN,
        tagTypes.SUPER_ADMIN,
      ],
    }),
  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation } = userApi;
