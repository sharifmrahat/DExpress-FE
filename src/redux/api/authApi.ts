import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignup: build.mutation({
      query: (signupData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: signupData,
      }),
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
    }),
    userSocialLogin: build.mutation({
      query: (socialLoginData) => ({
        url: `${AUTH_URL}/social`,
        method: "POST",
        data: socialLoginData,
      }),
    }),
    verifyEmail: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`,
        method: "POST",
        data: data,
      }),
    }),
    sendOTP: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/send-otp`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation,
  useUserSocialLoginMutation,
  useVerifyEmailMutation,
  useSendOTPMutation,
} = authApi;
