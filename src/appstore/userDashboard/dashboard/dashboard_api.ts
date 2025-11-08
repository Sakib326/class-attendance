import { apiSlice } from "../../api_slice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getActiveQuestionSets: build.query({
      query: (userId) => ({
        url: "/question-sets/active",
        params: { userId },
      }),
      providesTags: ["QuestionSet"],
    }),
    // Add other dashboard endpoints here
  }),
});

export const {
  useGetActiveQuestionSetsQuery,
  // Export other hooks here
} = dashboardApi;
