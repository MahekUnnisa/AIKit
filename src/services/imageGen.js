import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_IMAGE_KEY
const imageApiBaseUrl = import.meta.env.VITE_RAPID_API_IMAGE_BASE_URL

export const imageGenApi = createApi({
    reducerPath: 'imageGenApi',
    baseQuery: fetchBaseQuery({
        baseUrl: imageApiBaseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'arimagesynthesizer.p.rapidapi.com');
        }
    }),
    endpoints: (builder) => ({
        getImage: builder.query({
            query: ({ imageHash }) => `/get?hash=${imageHash}&returnType=base64`
        })
    })
})

export const { useLazyGetImageQuery } = imageGenApi;