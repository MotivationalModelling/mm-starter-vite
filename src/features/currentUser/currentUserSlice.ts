
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../app/store';
import {exampleApi} from '../../services/example';
import {CurrentUser} from '../../models/currentUser';


// ---------------------------------------------------------------------------

export interface CurrentUserState {
  currentUser: CurrentUser | undefined,
  status: string
}

// ---------------------------------------------------------------------------
// const initialState: AuthState | null = null;

const initialState: CurrentUserState = {
  currentUser: undefined,
  status: 'Idle.'
};

// ---------------------------------------------------------------------------

export const slice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
            console.log('>>>>>  setCurrentUser');
            console.log(JSON.stringify(action));
            // not using redux-toolkit combineReducer so no immer
            // state.users = action.payload;
            return {...state, currentUser: action.payload};
        }
    },
    extraReducers: (builder) => {
      builder.addMatcher(exampleApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('>>>>>  currentUserSlice - login.matchFulfilled');
        console.log('>>>>>  action |' + JSON.stringify(action) + '|');
        // state = Object.assign(state, action.payload.user);
        state.currentUser = action.payload.user;
        state.status = 'Fulfilled.';
      });
    }
});

// ---------------------------------------------------------------------------

export const selectCurrentUser = (state: RootState) => state.currentUser;
export const selectCurrentUserRole = (state: RootState) => state.currentUser.currentUser?.role;
export const selectCurrentUserIsSuperuser = createSelector(selectCurrentUserRole, (role) =>
    (role === 'superuser')
);
export const selectCurrentUserIsManager = createSelector(selectCurrentUserRole, (role) =>
    (role === 'manager')
);
// Really a Course Coordinator or Lecturer or maybe a research coordinator.
export const selectCurrentUserIsCoordinator = createSelector(selectCurrentUserRole, (role) =>
    (role === 'coordinator')
);
// Note:
//   Roles can be:
//     superuser, manager, coordinator, admin, editor, viewer, user, student, guest
//  Maybe have a type of user - research (academic and attached to an institution),
//     student (academic & attached to a course), analyst (i.e. commercial), or maybe just unattached
// Students and lecturers will be associated with one or more courses
// What about institutions - UniMelb, Swinburne, etc.  These are not users but users are associated with them.
// There is also a blury line between academic instututions, research institutions and commercial organisaations.
// Users may be associated with either, all or any combination.  Users may also have no associations.
// ---------------------------------------------------------------------------

export const {
    setCurrentUser
} = slice.actions;

export default slice.reducer;
