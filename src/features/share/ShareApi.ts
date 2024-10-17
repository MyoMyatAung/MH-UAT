import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ShareApi = createApi({
  reducerPath: "shareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cc3e497d.qdhgtch.com:2345/api",
  }),
  endpoints: (builder) => ({
    getShareScan: builder.query({
      query: ({ qr_create }) => ({
        url: "/v1/user/get_share",
        method: "GET",
        params: {
          qr_create: qr_create,
        },
      }),
    }),
  }),
});

export const { useGetShareScanQuery } = ShareApi;

export default ShareApi;
