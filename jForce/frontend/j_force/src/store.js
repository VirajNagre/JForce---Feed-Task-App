import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { apiSlice } from './Slices/Apislice';

import userSliceReducer from './Slices/UserSlice'

const store = configureStore({

        reducer : {
                [apiSlice.reducerPath] : apiSlice.reducer,
                auth : userSliceReducer,
        },

        middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),

        devTools : true
})

export default store
