import { apiSlice } from '../api_slice';

export const subscriberApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllSubscriber: build.query({
      query: (advisorQueryString) => `/users${advisorQueryString}`,
      providesTags: ['Subscriber'],
    }),

    deleteSubscriber: build.mutation({
      query: ({ id }) => {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Subscriber'],
    }),
    getSingleSubscriber: build.query({
      query: ({ id }) => `/users/${id}`,
      providesTags: ['Subscriber'],
    }),
    updateSubscriber: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Subscriber'],
    }),
    activeSubscriber: build.mutation({
      query: ({ ...data }) => ({
        url: `/users/verify`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Subscriber'],
    }),
  }),
});

export const {
  useGetAllSubscriberQuery,
  useDeleteSubscriberMutation,
  useUpdateSubscriberMutation,
  useGetSingleSubscriberQuery,
  useActiveSubscriberMutation,
} = subscriberApi;
