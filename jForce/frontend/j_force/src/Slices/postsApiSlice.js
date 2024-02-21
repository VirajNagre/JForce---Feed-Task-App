
import { apiSlice } from "./Apislice";
import { BASE_URL } from "./constants";

export const postsApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder)=>({
        getAllPosts: builder.query({
            query:()=>({
                url:"/post"
            }),
            keepUnusedDataFor:5,
            providesTags:["Post"]
        }),
        getAdminAllPosts: builder.query({
            query:()=>({
                url:"/post/admin"
            }),
            keepUnusedDataFor:5,
            providesTags:["Post"]
        }),
        getMyPosts: builder.query({
            query:()=>({
                url:"/post/myposts"
            }),
            keepUnusedDataFor:5,
            providesTags:["Post"]
        }),
        createNewPost: builder.mutation({
            query:(content)=>({
                url:"/post/new",
                body:content,
                method:"POST"
            }),
        }),
        viewPost: builder.query({
            query:(id)=>({
                url:"/post/"+id,
            }),
            keepUnusedDataFor:5,
            providesTags:["Post"]
        }),
        approvePost: builder.mutation({
            query: (postId) => ({
              url: `/post/${postId}/approve`,
              method: "PATCH"
            }),
            invalidatesTags: ["Post"]
          }),
          rejectPost: builder.mutation({
            query: (postId) => ({
              url: `/post/${postId}/reject`,
              method: "PATCH"
            }),
            invalidatesTags: ["Post"]
          }),
    })
})

export const {useGetAllPostsQuery, useGetMyPostsQuery, useCreateNewPostMutation, useViewPostQuery, useGetAdminAllPostsQuery,useApprovePostMutation,useRejectPostMutation } = postsApiSlice;