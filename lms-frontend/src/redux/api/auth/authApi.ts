import { TagTypes } from "@/types/tagType"
import { baseApi } from "../baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => {
        return {
           url:"/user/create-student",
           method:"POST",
           body:data
        }
      },
      invalidatesTags:[TagTypes.student]
    }),
    loginStudent: builder.mutation({
      query: (data) => {
        return {
           url:"/auth/login",
           method:"POST",
           body:data
        }
      },
      invalidatesTags:[TagTypes.student]
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateStudentMutation,useLoginStudentMutation} = authApi