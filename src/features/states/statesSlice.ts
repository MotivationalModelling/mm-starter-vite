import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {geoApi} from '../../services/geo';
import {State} from './stateSlice';


export interface StatesState {
  states: State[] | undefined;
  status: string | undefined;
}

const initialState: StatesState = {
  states: undefined,
  status: undefined
};

export const slice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        setStates: (state, action: PayloadAction<State[]>) => {
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            return { ...state, states: action.payload };
        }
    },
    extraReducers: (builder) => {

      builder.addMatcher(geoApi.endpoints.getStates.matchFulfilled, (state, action) => {
        console.log('>>>>>  citiesSlice - getStates.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // assert(state !== null, "setting attributes on null ain't gonna work");
        state.states = action.payload;
        state.status = 'Fulfilled.';
      });

    }
});

export const selectStates = (state: RootState) => state.states;
export const {
    setStates
} = slice.actions;

export default slice.reducer;
