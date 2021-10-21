import { api } from "../../services/baseApi";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
    }),
    getUserPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation, useGetUserPostQuery } = extendedApi;
