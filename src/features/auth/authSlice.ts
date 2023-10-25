import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import jwt_decode, { JwtPayload } from 'jwt-decode'

import {RootState} from '../../app/store';
import {exampleApi} from '../../services/example';
import {CurrentUser} from '../../models/currentUser';

// ---------------------------------------------------------------------------

export interface AuthResponse { // This is returned from the /authenticate request
  token: string;
  user: CurrentUser;
}

// ---------------------------------------------------------------------------

export interface AuthState {
  tok: string | undefined,
  auth: JwtPayload | undefined,
  user: CurrentUser | undefined,
  error: undefined
}

// ---------------------------------------------------------------------------
// const initialState: AuthState | null = null;

const initialState: AuthState = {
  tok: undefined,
  auth: undefined,
  user: undefined,
  error: undefined
};

// ---------------------------------------------------------------------------

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthResponse>) => {
            console.log('>>>>>  setAuth');
            console.log(action.payload);
            // not using redux-toolkit combineReducer so no immer
            // state.tok = action.payload.tok;
            // return {
            //     ...state,
            //     auth: jwt_decode<JwtPayload>(action.payload.token)
            // };
            state = Object.assign(state, jwt_decode<JwtPayload>(action.payload.token));
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(exampleApi.endpoints.getAuth.matchFulfilled, (state, action) => {
            // assert(state !== null, "setting attributes on null ain't gonna work");
            Object.assign(state, jwt_decode<JwtPayload>(action.payload.token));
        });
        builder.addMatcher(exampleApi.endpoints.doAuthenticate.matchFulfilled, (state, action) => {
          state.tok = action.payload.token;
          state.auth = jwt_decode<JwtPayload>(action.payload.token);
          state.user = action.payload.user;
          state.error = undefined;
        });
        builder.addMatcher(exampleApi.endpoints.login.matchFulfilled, (state, action) => {
          state.tok = action.payload.token;
          state.auth = jwt_decode<JwtPayload>(action.payload.token);
          state.user = action.payload.user;
          state.error = undefined;
        });
    }
});

// ---------------------------------------------------------------------------

export const selectAuth = (state: RootState) => state.auth;

export const {
    setAuth
} = slice.actions;

export default slice.reducer;

