import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Http } from "../components/enum/http.method";
import { User, Users } from "model/IUser";
import { BASE_URL, isJsonContentType, processError, processResponse } from "../utils/requestutils";
import { Geographies } from "model/IGeograpgy";
import { UserPerformance } from "model/IUserPerformance";
import { IResponse } from "model/IResponse";
import { EmailAddress, IRegisterRequest, IUserRequest, UpdateNewPassword } from "model/ICredentials";



export const userAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include', isJsonContentType}), // Ensure a default value for BASE_URL
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUserProfile: builder.query<IResponse<User>, void>({
      query: ()=>({
          url: '/users/profile',
          method: Http.GET
      }),
      keepUnusedDataFor:120,
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      providesTags: (result, error)=> ['User']
  }),
    registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
      query: (registerRequest)=>({
          url: '/users/register',
          method: Http.POST,
          body: registerRequest
      }),
     
      transformErrorResponse: processError,
     
  }),
  
    loginUser: builder.mutation<IResponse<User>, IUserRequest>({
      query: (credentials)=>({
          url: '/users/login',
          method: Http.POST,
          body: credentials
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
     
  }),
  logoutUser: builder.mutation<IResponse<void>, void>({
    query: (credentials)=>({
        url: '/users/logout',
        method: Http.POST,
        body: credentials
    }),
   
    transformErrorResponse: processError,
   
}),
  verifyPassword: builder.mutation<IResponse<User>, string>({
    query: (key)=>({
        url: `/users/verify/password?key=${key}`,
        method: Http.GET,
     
    }),
    transformResponse: processResponse<User>,
    transformErrorResponse: processError,
   
}),
verifyAccount: builder.mutation<IResponse<void>, string>({
  query: (key)=>({
      url: `/users/verify/account?key=${key}`,
      method: Http.GET,
   
  }),
  transformResponse: processResponse<void>,
  transformErrorResponse: processError,
 
}),
  resetPassword: builder.mutation<IResponse<void>, EmailAddress>({
    query: (email)=>({
        url: `/users/resetpassword`,
        method: Http.POST,
        body: email
     
    }),
    transformResponse:processResponse<void>,
    transformErrorResponse: processError,
    invalidatesTags: (result, error) => error ? [] : ['User'] 
   
}),
doResetPassword: builder.mutation<IResponse<void>, UpdateNewPassword>({
  query: (passwordRequest)=>({
      url: `/users/resetpassword/reset`,
      method: Http.POST,
      body: passwordRequest
   
  }),
  transformResponse: processResponse<void>,
  transformErrorResponse: processError,
  invalidatesTags: (result, error) => error ? [] : ['User']
 
}),
    fetchUser: builder.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: Http.GET,
      }),
      keepUnusedDataFor:120,
      providesTags: (result, error)=> ['User']
    }),

    fetchUsers: builder.query<Users, void>({
        query: () => ({
          url: `/users`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['User']
      }),
      fetchUsersAdmin: builder.query<Users, void>({
        query: () => ({
          url: `/users/admins`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['User']
      }),

      fetchUsersGeography: builder.query<Geographies, void>({
        query: () => ({
          url: `/users/geography`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['User']
      }),

      fetchUserPerformance: builder.query<UserPerformance, string>({
        query: (userId) => ({
          url: `/users/user-performance/${userId}`,
          method: Http.GET,
        }),
        keepUnusedDataFor:120,
        providesTags: (result, error)=> ['User']
      }),
    
  }),



});


