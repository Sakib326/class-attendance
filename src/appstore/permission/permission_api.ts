import { apiSlice } from '../api_slice';

export const permissionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPermissions: build.query({
      query: (queryString) => {
        return {
          url: `/permission${queryString}`,
        };
      },
      providesTags: ['Permission'],
    }),
    getSinglePermission: build.query({
      query: (idx) => `/permission/${idx}`,
    }),
    deletePermission: build.mutation({
      query: ({ idx, type }) => {
        return {
          url: `/permission/${idx}${type ? '/' + type : ''}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Permission'],
    }),
    updatePermission: build.mutation({
      query: ({ idx, data }) => ({
        url: `/permission/${idx}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Permission'],
    }),
    createPermission: build.mutation({
      query: (data) => ({
        url: `/permission`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Permission'],
    }),
    syncPermission: build.mutation({
      query: (data) => ({
        url: `permission/sync`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Permission'],
    }),
  }),
});

export const {
  useGetAllPermissionsQuery,
  useGetSinglePermissionQuery,
  useLazyGetSinglePermissionQuery,
  useUpdatePermissionMutation,
  useCreatePermissionMutation,
  useSyncPermissionMutation,
  useDeletePermissionMutation,
} = permissionApi;
