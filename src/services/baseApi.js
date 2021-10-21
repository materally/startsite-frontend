import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com/",
  prepareHeaders: (headers) => {
    headers.set("Cache", "no-cache");
    headers.set("Accept", "application/json; charset=UTF-8");
    const token = localStorage.getItem("api_token");
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
