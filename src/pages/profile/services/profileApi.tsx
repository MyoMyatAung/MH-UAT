import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://cc3e497d.qdhgtch.com:2345/api/v1",
    prepareHeaders: (headers) => {
      // Get the auth token from localStorage
      const storedAuth = JSON.parse(localStorage.getItem("authToken") || "{}");
      const accessToken = storedAuth?.data?.access_token;

      headers.set("Accept-Language", "en");

      // Add Authorization header if access token exists
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getNotification: builder.query<any, void>({
      query: () => {
        return `notice_v2/list`;
      },
    }),
    getUser: builder.query<any, void>({
      query: () => {
        return `/user/info`;
      },
    }),
    logOutUser: builder.mutation<void, void>({
      query: () => ({
        url: `/user/logout`,
      }),
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetUserQuery,
  useLogOutUserMutation,
} = profileApi;
