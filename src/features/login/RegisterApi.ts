import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the types for the signUpEmail mutation arguments
interface SignUpEmailArgs {
  email: string;
  password: string;
  email_code: string;
}

// Define the response type to include both data and msg
interface SignUpResponse {
  data: any; // Adjust this to the actual expected data structure from the API
  msg: string; // Define msg here
}

const RegisterApi = createApi({
  reducerPath: "RegisterSignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cc3e497d.qdhgtch.com:2345/api",
  }),
  endpoints: (builder) => ({
    signUpEmail: builder.mutation<SignUpResponse, SignUpEmailArgs>({
      query: ({ email, password, email_code }) => ({
        url: "/v1/user/register/email",
        method: "POST",
        body: {
          email,
          password,
          email_code,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // Get the response data

          const msg = data.msg;

          console.log("Registration successful:", data,msg);
        
        } catch (error: any) {
          console.error(
            "Registration error:",
            error.error?.data || error.message
          );
          throw error;
        }
      },
    }),
  }),
});

export const { useSignUpEmailMutation } = RegisterApi;
export default RegisterApi;
