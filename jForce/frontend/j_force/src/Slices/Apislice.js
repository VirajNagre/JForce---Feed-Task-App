import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../Slices/constants.js'

export const apiSlice =  createApi({
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL,credentials: 'include'}),
    tagTypes:['User','Post'],
    endpoints: (builder) => ({}),
})
