import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {geoApi} from '../../services/geo';
import {IsoCountry} from './isoCountrySlice';


export interface IsoCountriesState {
  isoCountries: IsoCountry[] | undefined;
  status: string | undefined;
}

const initialState: IsoCountriesState = {
  isoCountries: undefined,
  status: undefined
};

export const slice = createSlice({
    name: 'isoCountries',
    initialState,
    reducers: {
        setIsoCountries: (state, action: PayloadAction<IsoCountry[]>) => {
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            return { ...state, isoCountries: action.payload };
        }
    },
    extraReducers: (builder) => {

      builder.addMatcher(geoApi.endpoints.getIsoCountries.matchFulfilled, (state, action) => {
        console.log('>>>>>  isoCountriesSlice - getIsoCountries.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // assert(state !== null, "setting attributes on null ain't gonna work");
        state.isoCountries = action.payload;
        state.status = 'Fulfilled.';
      });

    }
});

export const selectIsoCountries = (state: RootState) => state.isoCountries;
export const {
  setIsoCountries
} = slice.actions;

export default slice.reducer;
