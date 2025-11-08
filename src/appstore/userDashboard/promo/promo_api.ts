import { apiSlice } from "../../api_slice";

export const promoApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    validatePromoCodeData: build.query({
      query: ({
        code,
        questionSetId,
      }: {
        code: string;
        questionSetId: number;
      }) => `/promo-codes/validate/${code}/${questionSetId}`,
      providesTags: (_result, _error, { code }) => [
        { type: "PromoCode", id: code },
      ],
    }),
  }),
});

export const {
  useValidatePromoCodeDataQuery,
  useLazyValidatePromoCodeDataQuery,
} = promoApi;
