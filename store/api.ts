import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['products', 'product'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://660a81e9ccda4cbc75db0ed2.mockapi.io/'
  }),
  endpoints: build => ({
    getProducts: build.query<Product[], void>({
      query: () => 'products'
    }),
    getProduct: build.query<Product, string>({
      query: (id) => ({url: `products/${id}`})
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery
} = api