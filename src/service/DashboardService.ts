import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Http } from "../components/enum/http.method";
import { BASE_URL, isJsonContentType } from "../utils/requestutils";
import { Dashboard } from "model/IDashboard";



export const dashboardAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,  isJsonContentType}), // Ensure a default value for BASE_URL
  reducerPath: "daswhboardAPI",
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({

      fetchDashboard: builder.query<Dashboard, void>({
        query: () => ({
          url: `/dashboard/stats`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['Dashboard']
      }),
    
  }),



});


