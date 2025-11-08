import { apiSlice } from "../api_slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => {
        return {
          url: "/auth/email/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.accessToken,
              refresh_token: result?.data?.refresh_token,
              user: result?.data?.user,
            })
          );
        } catch (error) {
          console.error("Failed to sign in:", error);
        }
      },
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/auth/email/register",
        method: "POST",
        body,
      }),
    }),
    getAdminDashboardStats: build.query({
      query: () => `/dashboard/stats`,
    }),

    getUsedPromo: build.query({
      query: () => `/dashboard/promo`,
    }),

    getProfile: build.query({
      query: () => `/auth/me`,
    }),

    updateProfile: build.mutation({
      query: (body) => ({
        url: "/auth/me",
        method: "PATCH",
        body,
        formData: true,
      }),
    }),
    logOut: build.query({
      query: () => `/auth/logout`,
    }),
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "/auth/forgot/password",
        method: "POST",
        body,
      }),
    }),
    sendOtp: build.mutation({
      query: (body) => ({
        url: "/auth/email/resend-activation",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: "/auth/reset/password",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: build.mutation({
      query: (body) => ({
        url: "/auth/email/confirm",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGetProfileQuery,
  useSendOtpMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useGetAdminDashboardStatsQuery,
  useGetUsedPromoQuery,
  useLogOutQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} = authApi;
