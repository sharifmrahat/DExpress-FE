import { IReviewQueryType } from "@/types";
import { baseApi } from "./baseApi";
const REVIEW_URL = "/reviews";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/create-review`,
        method: "POST",
        data: data,
      }),
    }),
    allReviews: build.query({
      query: (query?: IReviewQueryType) => {
        let url = `${REVIEW_URL}`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IReviewQueryType]) {
            const tempQuery = query[key as keyof IReviewQueryType];
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
    myReviews: build.query({
      query: (query?: IReviewQueryType) => {
        let url = `${REVIEW_URL}/my-reviews`;

        const queryArr = [];
        for (const key in query) {
          if (query[key as keyof IReviewQueryType]) {
            const tempQuery = query[key as keyof IReviewQueryType];
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
    singleReview: build.query({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `${REVIEW_URL}/{id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useAllReviewsQuery,
  useMyReviewsQuery,
  useSingleReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
