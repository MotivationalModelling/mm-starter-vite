import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {mmeApi} from '../../services/mme';
import {User} from "../../models/user";
import {Project} from "../../models/project";
import {GoalModel} from "../../models/goalModel";

// ----- Written by MM Redback 2021  -----------------------------------------
// A slice is created for the search functionality to communicate the endpoints
// ---------------------------------------------------------------------------

export interface SearchState {
    searchedUsers: User[];
    searchedProjects: Project[];
    searchedGoalModels: GoalModel[];
    status: string | undefined;
}

// ---------------------------------------------------------------------------

const initialState: SearchState = {
    searchedUsers: [],
    searchedProjects: [],
    searchedGoalModels: [],
    status: undefined
};

// ---------------------------------------------------------------------------

export const slice = createSlice({
    name: 'searchedResults',
    initialState,
    reducers: {
        setSearchedUsers: (state, action: PayloadAction<User[]>) => {
            state.searchedUsers = action.payload;
        },
        setSearchedProjects: (state: RootState, action: PayloadAction<Project[]>) => {
            return {...state, searchedProjects: action.payload};
        },
        setSearchedGoalModels: (state: RootState, action: PayloadAction<GoalModel[]>) => {
            return {...state, searchedGoalModels: action.payload};
        }
    },
    extraReducers: (builder) => {

        builder.addMatcher(mmeApi.endpoints.getUsersByUsername.matchFulfilled, (state, action) => {
            console.log('>>>>>  currentUserSlice - fetchUser.matchFulfilled');
            console.log('>>>>>  action |' + JSON.stringify(action) + '|');
            // assert(state !== null, "setting attributes on null ain't gonna work");
            state.searchedUsers = action.payload;
            state.status = 'Fulfilled.';
        });

        builder.addMatcher(mmeApi.endpoints.getProjectsByName.matchFulfilled, (state, action) => {
            state.searchedProjects = action.payload;
            state.status = 'Fulfilled.';
        });

        builder.addMatcher(mmeApi.endpoints.getGoalModelsByName.matchFulfilled, (state, action) => {
            state.searchedGoalModels = action.payload;
            state.status = 'Fulfilled.';
        });

    }
});

export const selectSearchedUsers = (state: RootState) => state.searchedUsers;
export const selectSearchedProjects = (state: RootState) => state.searchedProjects;
export const selectSearchedGoalModels= (state: RootState) => state.searchedGoalModels;
export const {
    setSearchedUsers,
    setSearchedProjects,
    setSearchedGoalModels,
} = slice.actions;

// ---------------------------------------------------------------------------

export default slice.reducer;

// ---------------------------------------------------------------------------
