import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {geoApi} from '../../services/geo';


export interface State {
  id: number;
  name: string;
  stateCode: string;
  countryCode: string;
}

export interface StateState {
  state: State | undefined;
  status: string | undefined;
}

const initialState: StateState = {
  state: undefined,
  status: 'Idle.'
};

export const slice = createSlice({
    name: 'state',
    initialState,
    reducers: {
      setState: (state, action: PayloadAction<State>) => {
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            // return {...state, user: action.payload};
            console.log('[setState]      action.payload |' + JSON.stringify(action.payload) + '|')
            Object.assign(state, action.payload);
        }
    },
    extraReducers: (builder) => {

      builder.addMatcher(geoApi.endpoints.getState.matchFulfilled, (state, action) => {
        console.log('>>>>>  stateSlice - getState.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // assert(state !== null, "setting attributes on null ain't gonna work");
        state.state = action.payload;
        state.status = 'Fulfilled.';
      });

    }
});

export const selectState = (state: RootState) => state.state;

export const {
  setState
} = slice.actions;

export default slice.reducer;
