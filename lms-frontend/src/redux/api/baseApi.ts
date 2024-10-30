import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { TagTypeList } from "@/types/tagType";

const baseQueryF = fetchBaseQuery({
  baseUrl: "https://lms-server-nine-phi.vercel.app/api/v1",
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryF,
  tagTypes: TagTypeList,
  endpoints: () => ({}),
});
