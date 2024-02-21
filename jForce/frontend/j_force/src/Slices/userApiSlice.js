import { BASE_URL, USERS_URL } from "./constants.js";
import { apiSlice } from "./Apislice.js";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/user/login`,
        body: data,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        // url: `abcd/user/register`,
        url: `${BASE_URL}/user/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:['User']
      ,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = userApiSlice;