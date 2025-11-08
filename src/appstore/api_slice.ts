import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";

// Base query function with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, {}) => {
    const localStorageToken = JSON.parse(localStorage.getItem("auth")!);
    const token = localStorageToken?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Refresh token query function
const refreshTokenQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers) => {
    const localStorageToken = JSON.parse(localStorage.getItem("auth")!);
    const refreshToken = localStorageToken?.refreshToken;
    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }
    return headers;
  },
});

// Enhanced baseQuery with token refresh
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Try the initial query
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 Unauthorized response, try to refresh the token
  if (result.error && result.error.status === 401) {
    try {
      // Try to get a new token
      const refreshResult: any = await refreshTokenQuery(
        { url: "auth/refresh", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store the new token
        const auth = JSON.parse(localStorage.getItem("auth")!);
        // Update the token in localStorage with the new token from the refresh result
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            token: refreshResult.data.token,
            refreshToken: refreshResult.data.refreshToken || auth.refreshToken,
          })
        );

        // Retry the original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, logout the user
        localStorage.removeItem("auth");
        window.location.href = `/login`;
      }
    } catch (error) {
      // Refresh token request failed
      localStorage.removeItem("auth");
      window.location.href = `/login`;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: [
    "Category",
    "Post",
    "LegalAdvisor",
    "Media",
    "mediaFolders",
    "Student",
    "Tag",
    "Comment",
    "BlogComment",
    "Promo",
    "Forum",
    "Answer",
    "Topics",
    "Subscriber",
    "Permission",
    "Role",
    "PublicForum",
    "PublicTopic",
    "StudentForum",
    "StudentTopic",
    "Question",
    "QuestionSet",
    "QuestionDepartment",
    "Exam",
    "PromoCode",
  ],
  endpoints: () => ({}),
});
