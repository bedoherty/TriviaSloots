import { AppState, UserState } from "src/Data/Objects/AppState";
import { createSelector } from "@reduxjs/toolkit";

// Local Helpers for Selection
const getUserState = (appState: AppState) => {
    return appState?.User;
}

const getUser = (userState: UserState) => {
    return userState?.user;
};

const getToken = (userState: UserState) => {
    return userState?.token;
};

// Memoized selectors for exporting to be used in React
export const getActiveUser = createSelector(
    getUserState,
    getUser
);

export const getActiveToken = createSelector(
    getUserState,
    getToken
);