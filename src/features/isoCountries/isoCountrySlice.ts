import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {geoApi} from '../../services/geo';


export interface IsoCountry {
  code: string;
  iso3: string;
  num3: number;
  name: string;
}

export interface IsoCountryState {
  isoCountry: IsoCountry | undefined;
  status: string | undefined;
}

const initialState: IsoCountryState = {
  isoCountry: undefined,
  status: 'Idle.'
};

export const slice = createSlice({
    name: 'isoCountry',
    initialState,
    reducers: {
      setIsoCountry: (state, action: PayloadAction<IsoCountry>) => {
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            // return {...state, user: action.payload};
            console.log('[setIsoCountry]      action.payload |' + JSON.stringify(action.payload) + '|')
            Object.assign(state, action.payload);
        }
    },
    extraReducers: (builder) => {

      builder.addMatcher(geoApi.endpoints.getIsoCountry.matchFulfilled, (state, action) => {
        console.log('>>>>>  stateSlice - getIsoCountry.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // assert(state !== null, "setting attributes on null ain't gonna work");
        state.isoCountry = action.payload;
        state.status = 'Fulfilled.';
      });

    }
});

export const selectIsoCountry = (state: RootState) => state.isoCountry;

export const {
  setIsoCountry
} = slice.actions;

export default slice.reducer;
