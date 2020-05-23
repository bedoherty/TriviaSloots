import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "src/Data/Objects/AppState";
import update from "immutability-helper";
import { ILoginUserPayload } from "src/Data/Interfaces/User";
import { ACTION_TYPES } from "src/Data/Objects/ActionTypes";

const { LOGIN_USER } = ACTION_TYPES.User;

const defaultState: UserState = {
    user: null,
    token: null
}

const loginUser = (state: UserState, action: PayloadAction<ILoginUserPayload>) => {
    if (action?.payload?.user && action?.payload?.token) {
        return update(state, {
            user: { 
                $set: action.payload.user
            },
            token: { 
                $set: action.payload.token
            }
        });
    }

    return state;
}

const reducers = (reducerBuilder) => {
    reducerBuilder.addCase(LOGIN_USER, loginUser);
}

export default createReducer(defaultState, reducers);