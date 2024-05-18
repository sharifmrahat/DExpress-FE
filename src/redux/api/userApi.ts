import { IUserQueryType } from "@/types";
import { baseApi } from "./baseApi";
const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        data: data,
      }),
    }),
    allUsers: build.query({
      query: (query?: IUserQueryType) => {
        let url = `${USER_URL}`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IUserQueryType]) {
            const tempQuery = query[key as keyof IUserQueryType];
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
    userProfile: build.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        data: data,
      }),
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/update-password`,
        method: "PATCH",
        data: data,
      }),
    }),
    singleUser: build.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useAllUsersQuery,
  useLazyAllUsersQuery,
  useUserProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useSingleUserQuery,
  useLazySingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
