import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => ({
        url: "/news",
        method: "GET",
      }),
    }),
    getNewsByQuery: builder.query({
      query: (searchQuery) => ({
        url: `news/query?search=${searchQuery}`,
        method: "GET",
      }),
    }),
    getNewsByPage: builder.query({
      query: (page) => ({
        url: `news?page=${page}&limit=20`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetNewsByQueryQuery,
  useGetNewsByPageQuery,
} = newsApi;
