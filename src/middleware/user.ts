
import {Middleware} from '@reduxjs/toolkit';

import {exampleApi} from '../services/example';

// ---------------------------------------------------------------------------

export const user: Middleware = () => (next) => (action) => {
    const result = next(action);

    switch (action.type) {
        case exampleApi.endpoints.login.matchFulfilled:
            // XXX this not how to get the user: action.payload.userId isn't set!!
            console.log('[middleware::user::login.matchFulfilled]  payload |' + JSON.stringify(action.payload) + '|');
            // store.dispatch(fetchCurrentUser(action.payload.userId));
            break;

        // case updateCurrentUser.fulfilled.type:
        //     console.log('[updateCurrentUser.fulfilled]             payload |' + JSON.stringify(action.payload) + '|');
        //     store.dispatch(fetchCurrentUser(action.payload.userId));
        //     break;

        default:
            break;
    }

    return result;
}

// ---------------------------------------------------------------------------
// https://stackoverflow.com/questions/45339448/how-do-you-create-strongly-typed-redux-middleware-in-typescript-from-reduxs-typ
// ---------------------------------------------------------------------------

