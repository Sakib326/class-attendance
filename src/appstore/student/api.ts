import { apiSlice } from "../api_slice";

interface FilterParams {
  keyword?: string;
  status?: { id: number }[];
  roles?: { id: number }[];
  studyType?: string;
}

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllStudent: build.query({
      query: (params) => {
        const { page = 1, limit = 10, filters = {}, sort = [] } = params || {};

        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());
        queryParams.append("limit", limit.toString());
        queryParams.append("filters", JSON.stringify(filters));
        queryParams.append("sort", JSON.stringify(sort));

        return `users?${queryParams.toString()}`;
      },
      providesTags: ["Student"],
    }),

    createStudent: build.mutation({
      query: (studentData) => ({
        url: "users",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),

    updateStudentStatus: build.mutation({
      query: ({ id, statusId }) => ({
        url: `users/${id}/status`,
        method: "PATCH",
        body: { statusId },
      }),
      invalidatesTags: ["Student"],
    }),

    getStudentById: build.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "Student", id }],
    }),

    updateStudent: build.mutation({
      query: ({ id, ...studentData }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: studentData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Student", id },
        "Student",
      ],
    }),

    deleteStudent: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    activateStudent: build.mutation({
      query: (id) => ({
        url: `users/${id}/activate`,
        method: "POST",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetAllStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentStatusMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useActivateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
