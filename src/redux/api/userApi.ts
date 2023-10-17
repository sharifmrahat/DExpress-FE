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
  }),
});

export const { useUserProfileQuery } = userApi;
