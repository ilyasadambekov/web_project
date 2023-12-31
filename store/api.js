import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['products', 'product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fakestoreapi.com/'
    }),
    endpoints: build => ({
        getProducts: build.query({
            query: () => 'products',
            providesTags: result =>
                result ? [
                        ...result.map(({ id }) => ({ type: 'products', id })),
                        { type: 'products', id: 'LIST' }
                    ]
                    : [{ type: 'products', id: 'LIST' }]
        }),
        getProduct: build.query({
            query: (id) => ({ url: `products/${id}` }),
            providesTags: (result, error, id) => [{ type: 'product', id }]
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery
} = api