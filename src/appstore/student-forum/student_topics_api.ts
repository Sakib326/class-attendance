import { apiSlice } from "../api_slice";

export const studentTopicApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllStudentTopics: build.query({
      query: (queryString) => `/student-topic${queryString}`,
      providesTags: ["StudentTopic"],
    }),
    createStudentTopics: build.mutation({
      query: (data) => ({
        url: "/student-topic",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudentTopic"],
    }),
    deleteStudentTopics: build.mutation({
      query: ({ idx, type }) => {
        return {
          url: `/student-topic/${idx}${type ? "/" + type : ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["StudentTopic"],
    }),
    getSingleStudentTopics: build.query({
      query: ({ idx }) => `/student-topic/${idx}`,
    }),
    updateStudentTopics: build.mutation({
      query: ({ idx, data }) => ({
        url: `/student-topic/${idx}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["StudentTopic"],
    }),
  }),
});

export const {
  useGetAllStudentTopicsQuery,
  useCreateStudentTopicsMutation,
  useDeleteStudentTopicsMutation,
  useGetSingleStudentTopicsQuery,
  useLazyGetSingleStudentTopicsQuery,
  useUpdateStudentTopicsMutation,
} = studentTopicApi;
