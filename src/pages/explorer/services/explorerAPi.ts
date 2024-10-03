import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const explorerAPi = createApi({
  reducerPath: "explorerAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cc3e497d.qdhgtch.com:2345/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getExploreList: builder.query<any, void>({
      query: () => {
        return `/movie/explore/list`;
      },
    }),
    getMovieTopicList: builder.query<any, void>({
      query: () => {
        return `/movie/topic`;
      },
    }),
    getMovieRankingList: builder.query<any, void>({
      query: () => {
        return `/movie/ranking/list`;
      },
    }),
  }),
});

export const { useGetExploreListQuery, useGetMovieTopicListQuery, useGetMovieRankingListQuery } =
  explorerAPi;
