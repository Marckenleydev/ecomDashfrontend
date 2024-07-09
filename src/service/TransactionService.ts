import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Http } from "../components/enum/http.method";

import { Query } from "model/IProduct";
import { isJsonContentType } from "../utils/requestutils";
import { BASE_URL } from "../utils/requestutils";
import { IPage, } from "../model/IPage";
import { Transaction, Transactions } from "../model/ITransaction.ts";



export const transactionAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,  isJsonContentType}), // Ensure a default value for BASE_URL
  reducerPath: "TransationApi",
  tagTypes: ["Transations"],
  endpoints: (builder) => ({

    fetchTransactions: builder.query<IPage<Transaction>, Query>({
        query: (query) => ({
          url: `transactions?page=${query.page}&size=${query.size}&sort=${query?.sort}&search=${query?.search}`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['Transations']
      }),
    
  }),



});


