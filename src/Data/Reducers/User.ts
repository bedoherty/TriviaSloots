import { createReducer, PayloadAction, Action } from "@reduxjs/toolkit";
import { UserState } from "src/Data/Objects/AppState";
import update from "immutability-helper";
import { ILoginUserPayload } from "src/Data/Interfaces/User";
import { ACTION_TYPES } from "src/Data/Objects/ActionTypes";

const { LOGIN_USER, LOGOUT_USER } = ACTION_TYPES.User;

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

const logoutUser = (state: UserState, action: Action) => {
    return update(state, {
        user: {
            $set: null
        },
        token: {
            $set: null
        }
    })
}

const reducers = (reducerBuilder) => {
    reducerBuilder.addCase(LOGIN_USER, loginUser);
    reducerBuilder.addCase(LOGOUT_USER, logoutUser);
}

export default createReducer(defaultState, reducers);