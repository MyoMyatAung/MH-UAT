import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cc3e497d.qdhgtch.com:2345/api/v1",
    prepareHeaders: (headers) => {
      const settings = JSON.parse(
        localStorage.getItem("movieAppSettings") || "{}"
      );
      if (settings.filterToggle) {
        headers.set("X-Client-Setting", JSON.stringify({ "pure-mode": 1 }));
      } else {
        headers.set("X-Client-Setting", JSON.stringify({ "pure-mode": 0 }));
      }
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getRecommendedMovies: builder.query<any, void>({
      query: () => {
        return `/movie/index_recommend`;
      },
    }),
  }),
});

export const { useGetRecommendedMoviesQuery } = homeApi;
