import { ACTION_TYPES } from "src/Data/Objects/ActionTypes";
import { createAction } from "@reduxjs/toolkit";
import { ILoginUserPayload } from "src/Data/Interfaces/User";

const { LOGIN_USER, LOGOUT_USER } = ACTION_TYPES.User;

export const loginUser = createAction<ILoginUserPayload>(LOGIN_USER);

export const logoutUser = createAction(LOGOUT_USER);