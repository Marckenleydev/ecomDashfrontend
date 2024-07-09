import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Http } from "../components/enum/http.method";

import { Product, Products, Query } from "../model/IProduct";
import { isJsonContentType } from "../utils/requestutils";
import { BASE_URL } from "../utils/requestutils";


export const productAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,  isJsonContentType}), // Ensure a default value for BASE_URL
  reducerPath: "ProductApi",
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchProduct: builder.query<Product, void>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: Http.GET,
      }),
      keepUnusedDataFor:120,
      providesTags: (result, error)=> ['Products']
    }),

    fetchProducts: builder.query<Products, Query>({
        query: () => ({
          url: `products`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['Products']
      }),
    
  }),



});


