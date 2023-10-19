import { baseApi } from "./baseApi";
const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/create-feedback`,
        method: "POST",
        data: data,
      }),
    }),
    allFeedbacks: build.query({
      query: () => ({
        url: `${FEEDBACK_URL}`,
        method: "GET",
      }),
    }),
    singleFeedback: build.query({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useAllFeedbacksQuery,
  useSingleFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
