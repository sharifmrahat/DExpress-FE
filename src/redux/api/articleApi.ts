import { baseApi } from "./baseApi";
const ARTICLE_URL = "/articles";

export const articleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createArticle: build.mutation({
      query: (data) => ({
        url: `${ARTICLE_URL}/create-article`,
        method: "POST",
        data: data,
      }),
    }),
    allArticles: build.query({
      query: () => ({
        url: `${ARTICLE_URL}`,
        method: "GET",
      }),
    }),
    singleArticle: build.query({
      query: (id) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateArticle: build.mutation({
      query: (data) => ({
        url: `${ARTICLE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
    }),
    deleteArticle: build.mutation({
      query: (id) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useAllArticlesQuery,
  useSingleArticleQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
