import { apiSlice } from "../api_slice";

export const studentForumApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllStudentForums: build.query({
      query: (queryString) => {
        return {
          url: `/student-forum${queryString}`,
        };
      },
      providesTags: ["StudentForum"],
    }),
    getSingleStudentForum: build.query({
      query: (idx) => `/student-forum/${idx}`,
    }),
    deleteStudentForum: build.mutation({
      query: (idx) => {
        return {
          url: `/student-forum/${idx}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["StudentForum"],
    }),
    updateStudentForum: build.mutation({
      query: ({ idx, data }) => ({
        url: `/student-forum/${idx}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["StudentForum"],
    }),
    createStudentForum: build.mutation({
      query: (data) => ({
        url: `/student-forum`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudentForum"],
    }),
  }),
});

export const {
  useGetAllStudentForumsQuery,
  useGetSingleStudentForumQuery,
  useLazyGetSingleStudentForumQuery,
  useUpdateStudentForumMutation,
  useCreateStudentForumMutation,
  useDeleteStudentForumMutation,
} = studentForumApi;
