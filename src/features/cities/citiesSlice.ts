import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {geoApi} from '../../services/geo';
import {City} from './citySlice';


export interface CitiesState {
  cities: City[] | undefined;
  status: string | undefined;
}

const initialState: CitiesState = {
  cities: undefined,
  status: undefined
};

export const slice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCities: (state, action: PayloadAction<City[]>) => {
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            return { ...state, cities: action.payload };
        }
    },
    extraReducers: (builder) => {

      builder.addMatcher(geoApi.endpoints.getCities.matchFulfilled, (state, action) => {
        console.log('>>>>>  citiesSlice - getCities.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // assert(state !== null, "setting attributes on null ain't gonna work");
        state.cities = action.payload;
        state.status = 'Fulfilled.';
      });

    }
});

export const selectCities = (state: RootState) => state.cities;
export const {
  setCities
} = slice.actions;

export default slice.reducer;
