import { apiSlice } from "../../api_slice";

export const examApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Start a new exam
    startExam: build.mutation({
      query: (data) => ({
        url: `/exams/start`,
        method: "POST",
        body: data, // { questionSetId: number, promoCode: string }
      }),
      invalidatesTags: ["Exam"],
    }),

    // Submit a single answer for a question
    submitAnswer: build.mutation({
      query: (data) => ({
        url: `/exams/answer`,
        method: "POST",
        body: data, // { examId: number, questionId: number, optionId: number }
      }),
      invalidatesTags: ["Exam"],
    }),

    // Complete an exam and calculate final score
    completeExam: build.mutation({
      query: (id) => ({
        url: `/exams/${id}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["Exam"],
    }),

    // Get exam details (assuming this might be needed)
    getExamById: build.query({
      query: (id) => `/exams/${id}`,
      providesTags: (result, error, id) => [{ type: "Exam", id }],
    }),

    // Get user's exam history (assuming this might be needed)
    getUserExams: build.query({
      query: (queryString = "") => `/exams${queryString}`,
      providesTags: ["Exam"],
    }),
  }),
});

export const {
  useStartExamMutation,
  useSubmitAnswerMutation,
  useCompleteExamMutation,
  useGetExamByIdQuery,
  useLazyGetExamByIdQuery,
  useGetUserExamsQuery,
} = examApi;
