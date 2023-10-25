
import {configureStore, ThunkAction, Action, Store} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {exampleApi} from '../services/example'
import {user} from '../middleware/user';
import authReducer from '../features/auth/authSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';

// ---------------------------------------------------------------------------

export const store: Store = configureStore({
    reducer: {
          auth: authReducer,
          currentUser: currentUserReducer,
          [exampleApi.reducerPath]: exampleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                                            .concat(exampleApi.middleware, user)
    // middleware: [...getDefaultMiddleware(), user, geoApi.middleware, authApi.middleware]
});

// ---------------------------------------------------------------------------
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// ---------------------------------------------------------------------------

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType=void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
