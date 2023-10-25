
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import  {AuthState} from '../features/auth/authSlice';
import type {RootState} from '../app/store';

import {City} from '../features/cities/citySlice';
import {State} from '../features/states/stateSlice';
import {IsoCountry} from '../features/isoCountries/isoCountrySlice';

import {baseUrl} from '../localizations';

// ---------------------------------------------------------------------------
// Based on - https://www.youtube.com/watch?v=FDEgXmx1V4A
// ---------------------------------------------------------------------------

// Define a service using a base URL and expected endpoints
export const geoApi = createApi({
    reducerPath: 'geoApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${baseUrl}/geo`,
      prepareHeaders: (headers: Headers, {getState}) => {

        const auth: AuthState | null = (getState() as RootState).auth;

        if (auth) {
          // const token = (getState() as RootState).auth.tok;
          // const expires = (getState() as RootState).auth.exp * 1000;
          const token = 'xxx'; // auth.tok;
          const expires = 0; // auth.exp * 1000;
    
          const now = Date.now();
    
          const ok = (expires > now + 2000);
    
          console.log('-----------------------------------');
          console.log('  token: ' + token);
          console.log('expires: ' + expires);
          console.log('    now: ' + now);
          console.log('     ok: ' + ok);
          console.log('headers: ' + JSON.stringify(headers));
          console.log('-----------------------------------');
    
          // If we have a token set in state, let's assume that we should be passing it.
          if (token && ok) {
            headers.set('authorization', `Bearer ${token}`)
          }
    
        }

        // headers.set('foo', 'bar');
    
        return headers
      },
    }),
    tagTypes: ['City','State','IsoCountry'],
    endpoints: (builder) => ({
        
        // -------------------------------------------------------------------

        // #region IsoCountry

        getIsoCountries: builder.query<IsoCountry[], void>({
            query: () => ({
            url: '/isocountries'
            })
        }),

        getIsoCountry: builder.query<IsoCountry, string>({
            query: (CountryCode) => ({
            url: `/isocountries/${CountryCode}`
            })
        }),

        // #endregion IsoCountry

        // -------------------------------------------------------------------

        // #region State

        getStates: builder.query<State[], void>({
            query: () => `/states`,
        }),

        getState: builder.query<State, string>({
            query: (id) => `/states/${id}`,
        }),

        getStatesInCountry: builder.query<State[], string>({
            query: (CountryCode) => `/states/${CountryCode}`,
        }),

        createState: builder.mutation<Record<string, never>, Omit<State, 'id'>>({
            query: (city) => ({
            url: '/states',
            method: 'POST',
            body: city
            }),
            // Invalidates all City-type queries providing the `LIST` id
            invalidatesTags: [{ type: 'City', id: 'LIST' }],
        }),

        updateState: builder.mutation<Record<string, never>, State>({
            query: ({id, ...rest}) => ({
            url: `/states/${id}`,
            method: 'PATCH',
            body: rest
            }),
            // invalidatesTags: (result, error, { id }) => [{ type: 'State', id }]
        }),

        deleteState: builder.mutation<Record<string, never>, string>({
            query: (id) => ({
            url: `/states/${id}`,
            method: 'DELETE'
            }),
            // Invalidates all queries that subscribe to this City `id` only.
            // invalidatesTags: (result, error, id) => [{ type: 'State', id }]
        }),

        // #endregion State

        // -----------------------------------------------------------------------

        // #region City

        getCities: builder.query<City[], void>({
            query: () => `/cities`,
            providesTags: (result) =>
            result  // is result available?
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'City', id } as const)),
                    { type: 'City', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'City', id: 'LIST' }],
        }),

        getCity: builder.query<City, string>({
            query: (id) => `/cities/${id}`
        }),

        getCitiesInCountry: builder.query<City[], string>({
            query: (CountryCode) => `/cities/for-Country-code/${CountryCode}`,
            providesTags: (result) =>
            result  // is result available?
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'City', id } as const)),
                    { type: 'City', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'City', id: 'LIST' }],
        }),

        getCitiesInState: builder.query<City[], string>({
            query: (stateCode) => `/cities/for-state-code/${stateCode}`,
            providesTags: (result) =>
            result  // is result available?
            ? // successful query
                [
                ...result.map(({ id }) => ({ type: 'City', id } as const)),
                { type: 'City', id: 'LIST' },
                ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'City', id: 'LIST' }],
        }),

        getCityForCityCode: builder.query<City, string>({
            query: (cityCode) => `/cities/for-city-code/${cityCode}`
        }),

        createCity: builder.mutation<Record<string, never>, Omit<City, 'id'>>({
                query: (city) => ({
                    url: '/cities',
                    method: 'POST',
                    body: city
                }),
                // Invalidates all City-type queries providing the `LIST` id
                invalidatesTags: [{ type: 'City', id: 'LIST' }],
        }),

        updateCity: builder.mutation<Record<string, never>, City>({
            query: ({id, ...rest}) => ({
                url: `/cities/${id}`,
                method: 'PATCH',
                body: rest
            }),
            // Invalidates all queries that subscribe to this City `id` only.
            // In this case, `getCity` will be re-run. `getCities` *might*  rerun, if this id was under its results.
            // invalidatesTags: (result, error, { id }) => [{ type: 'City', id }]
        }),

        deleteCity: builder.mutation<Record<string, never>, string>({
            query: (id) => ({
                url: `/cities/${id}`,
                method: 'DELETE'
            }),
            // Invalidates all queries that subscribe to this City `id` only.
            // invalidatesTags: (result, error, id) => [{ type: 'City', id }]
        }),

        // #endregion City
        
        // -------------------------------------------------------------------

    }),
});

// ---------------------------------------------------------------------------
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// ---------------------------------------------------------------------------

export const {

    useGetIsoCountryQuery,
    useGetIsoCountriesQuery,

    useGetCityQuery,
    useGetCitiesQuery,
    // useGetCitiesInCountryQuery,
    useCreateCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,

    useGetStateQuery,
    useGetStatesQuery,
    // useGetStatesInCountryQuery,
    // useCreateStateMutation,
    // useUpdateStateMutation,
    // useDeleteStateMutation

} = geoApi;

// ---------------------------------------------------------------------------

