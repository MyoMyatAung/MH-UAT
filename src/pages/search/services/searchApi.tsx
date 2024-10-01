import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  tagTypes: ["SearchMovie"] as const,

  baseQuery: fetchBaseQuery({
    baseUrl: "https://cc3e497d.qdhgtch.com:2345/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getSearchMovie: builder.query<any, any>({
      query: (data) => {
        const { keyword } = data;
        return {
          url: `movie/search?keyword=${keyword}`,
        };
      },
      providesTags: (result, error, arg): any[] => [
        { type: "SearchMovie", id: arg },
      ],
    }),
  }),
});

export const { useGetSearchMovieQuery } = searchApi;
