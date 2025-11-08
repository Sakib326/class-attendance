import { apiSlice } from '../api_slice';

export const roleApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllRoles: build.query({
      query: (queryString) => `/role${queryString}`,
      providesTags: ['Role'],
    }),
    getPublicRoles: build.query({
      query: (queryString) => `/role/public${queryString}`,
      providesTags: ['Role'],
    }),
    createRoles: build.mutation({
      query: (data) => ({
        url: '/role',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Role'],
    }),
    deleteRoles: build.mutation({
      query: ({ idx, type }) => {
        return {
          url: `/role/${idx}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Role'],
    }),
    getSingleRoles: build.query({
      query: (idx) => `/role/${idx}`,
    }),
    updateRoles: build.mutation({
      query: ({ idx, ...data }) => ({
        url: `/role/${idx}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useCreateRolesMutation,
  useDeleteRolesMutation,
  useUpdateRolesMutation,
  useGetSingleRolesQuery,
  useLazyGetSingleRolesQuery,
  useGetPublicRolesQuery,
} = roleApi;
