
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {AuthResponse} from '../features/auth/authSlice';

import {CurrentUser} from '../models/currentUser';
import {User} from '../models/user';

import type {RootState} from '../app/store'

import {baseUrl, hashedBasicAuthCredentials} from '../localizations';

// Based on - https://www.youtube.com/watch?v=FDEgXmx1V4A

// ---------------------------------------------------------------------------

export interface LoginResponse {
    token: string,
    user: CurrentUser
}

// ---------------------------------------------------------------------------

export interface LoginRequest {
    username: string,
    password: string
}

// ---------------------------------------------------------------------------

export interface UpdateResponse {
    result: string,
    id: string
}

// ---------------------------------------------------------------------------

export interface InsertResponse {
    result: string
}

// ---------------------------------------------------------------------------
// Define a service using a base URL and expected endpoints
// ---------------------------------------------------------------------------

export const exampleApi = createApi({
    reducerPath: 'exampleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers: Headers, {getState}) => {
            const token = (getState() as RootState).auth.tok

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            // headers.set('foo', 'bar');

            return headers
        },
    }),
    tagTypes: [
        'User'
    ],
    endpoints: (builder) => ({

        // -------------------------------------------------------------------

        // #region Auth

        getAuth: builder.query<AuthResponse, void>({
            query: () => ({
                url: '/authorization',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`
                }
            })
        }),

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/v3/authenticate',
                method: 'POST',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`,
                },
                body: credentials,
            }),
        }),

        doAuth: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/authorize',
                method: 'POST',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`,
                }
            })
        }),

        doAuthenticate: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/authenticate',
                method: 'POST',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`,
                }
            })
        }),

        // #endregion Auth

        // -------------------------------------------------------------------

        // #region User

        getUser: builder.query<User, number>({
            query: (id) => `/application-users/${id}`,
            providesTags: (result) => 
                result  // is result available?
                ? // successful query
                    [
                    { type: 'User', id: result.id } as const
                    ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    []
        }),

        getUserByGuid: builder.query<User, string>({
            query: (userGuid) => `/application-users/guid/${userGuid}`,
            providesTags: (result) => 
                result  // is result available?
                ? // successful query
                    [
                    { type: 'User', id: result.id } as const
                    ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    []
        }),

        getUsers: builder.query<User[], void>({
            query: () => `/application-users`,
            providesTags: (result) =>
                result  // is result available?
                    ? // successful query
                        [
                            ...result.map(({ id }) => ({ type: 'User', id: id } as const)),
                            { type: 'User', id: 'LIST' },
                        ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                        [{ type: 'User', id: 'LIST' }],
        }),

        getUsersByUsername: builder.query<User[], string>({
            query: (username) => `/search/user/${username}`,
            providesTags: (result) =>
                result
                    ? // successful query
                    [
                        ...result.map(({ username }) => ({ type: 'User', id: username } as const)),
                        { type: 'User', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                        [],
        }),

        updateUser: builder.mutation<UpdateResponse, User>({
            query: (user) => ({
                url: `/application-users/${user.id}`,
                method: 'PATCH',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`,
                },
                body: user,
            }),
            invalidatesTags: (result) =>
                result  // is result available?
                    ? // successful query
                        [
                            { type: 'User', id: result.id } as const,
                            { type: 'User', id: 'LIST' },
                        ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                        [{ type: 'User', id: 'LIST' }],
        }),
        
        insertUser: builder.mutation<User, User>({
            query: (user) => ({
                url: '/application-users',
                method: 'POST',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`,
                },
                body: user,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        deleteUser: builder.mutation<Record<string, never>, User>({
            query: (user) => ({
                url: `/application-users/${user.id}`,
                method: 'DELETE',
                headers: {
                    'authorization': `Basic ${hashedBasicAuthCredentials}`,
                }
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        // #endregion User

        // -------------------------------------------------------------------



    })

});

// ---------------------------------------------------------------------------
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAuthQuery,
    useDoAuthMutation,
    useDoAuthenticateMutation,
    useLoginMutation,

    useGetUserQuery,
    useGetUserByGuidQuery,
    useGetUsersQuery,
    useGetUsersByUsernameQuery,
    useUpdateUserMutation,
    useInsertUserMutation,
    useDeleteUserMutation,
} = exampleApi;

