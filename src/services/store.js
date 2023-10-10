import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { imageGenApi } from "./imageGen";
export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [imageGenApi.reducerPath]: imageGenApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(articleApi.middleware).concat(imageGenApi.middleware)
});