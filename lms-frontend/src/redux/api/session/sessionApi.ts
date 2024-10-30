import { TagTypes } from "@/types/tagType";
import { baseApi } from "../baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    crateSession: builder.mutation({
      query: (data) => {
        return {
          url: `/session/create-session/${data?.courseId}`,
          method: "POST",
          body: data?.session,
        };
      },
      invalidatesTags: [TagTypes.session],
    }),
    getSessionDeatils: builder.query({
      query: (sessionId: string) => {
        return {
          url: `/session/${sessionId}`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.session],
    }),
    getSessionByTeacher: builder.query({
      query: () => {
        return {
          url: `/session/teacher/session`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.session],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCrateSessionMutation,
  useGetSessionDeatilsQuery,
  useGetSessionByTeacherQuery,
} = sessionApi;
