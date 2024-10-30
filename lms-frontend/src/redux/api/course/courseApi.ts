import { TagTypes } from "@/types/tagType";
import { baseApi } from "../baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: (args) => {
        return {
          url: "/course",
          method: "GET",
          params: args,
        };
      },
      providesTags: [TagTypes.course],
    }),
    getAllCourseByTeacher: builder.query({
      query: (args) => {
        return {
          url: "/course/teacher-courses",
          method: "GET",
          params: args,
        };
      },
      providesTags: [TagTypes.course],
    }),
    getSingleCourseById: builder.query({
      query: (courseId: string) => {
        return {
          url: `/course/${courseId}`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.course],
    }),
    enrolledCourse: builder.mutation({
      query: (courseId: string) => {
        return {
          url: `/course/${courseId}/enroll`,
          method: "POST",
        };
      },
      invalidatesTags: [TagTypes.course],
    }),
    getEnrolledCourses: builder.query({
      query: () => {
        return {
          url: "/course/enrolled/courses",
          method: "GET",
        };
      },
      providesTags: [TagTypes.course],
    }),
    getIsEnrolledCourse: builder.query({
      query: (courseId: string) => {
        return {
          url: `/course/enrolled/courses/enroll/${courseId}`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.course],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCourseQuery,
  useGetSingleCourseByIdQuery,
  useEnrolledCourseMutation,
  useGetEnrolledCoursesQuery,
  useGetIsEnrolledCourseQuery,
  useGetAllCourseByTeacherQuery,
} = courseApi;
