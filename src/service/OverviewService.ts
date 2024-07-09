import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Http } from "../components/enum/http.method";
import { BASE_URL, isJsonContentType } from "../utils/requestutils";
import { Overview } from "model/IOverview";



export const overViewAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,  isJsonContentType}), // Ensure a default value for BASE_URL
  reducerPath: "overViewAPI",
  tagTypes: ["Overview"],
  endpoints: (builder) => ({

      fetchOverAllStatts: builder.query<Overview, void>({
        query: () => ({
          url: `/overall-stats`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['Overview']
      }),
    
  }),



});


