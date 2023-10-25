import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {geoApi} from '../../services/geo';


export interface City {
  id: number;
  name: string;
  cityCode: string;
  stateCode: string;
  countryCode: string;
}

export interface CityState {
  city: City | undefined;
  status: string | undefined;
}

const initialState: CityState = {
  city: undefined,
  status: 'Idle.'
};

export const slice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<City>) => {
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            // return {...state, user: action.payload};
            console.log('[setCity]      action.payload |' + JSON.stringify(action.payload) + '|')
            Object.assign(state, action.payload);
        }
    },
    extraReducers: (builder) => {

      builder.addMatcher(geoApi.endpoints.getCity.matchFulfilled, (state, action) => {
        console.log('>>>>>  citySlice - getCity.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // assert(state !== null, "setting attributes on null ain't gonna work");
        state.city = action.payload;
        state.status = 'Fulfilled.';
      });

    }
});

export const selectCity = (state: RootState) => state.city;

export const {
    setCity
} = slice.actions;

export default slice.reducer;
