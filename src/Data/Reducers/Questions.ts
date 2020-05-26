import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { ACTION_TYPES } from "src/Data/Objects/ActionTypes";
import { QuestionState } from "src/Data/Objects/AppState";
import { IDataPage } from "../Interfaces/Pagination";
import { IQuestion } from "../Interfaces/Questions";
import { fetchQuestionsPageAsync } from "../Actions/Questions";

const { LOGIN_USER, LOGOUT_USER } = ACTION_TYPES.User;

const defaultState: QuestionState = {
    data: [],
    lastPage: -1,
    pagesFetched: [],
    options: {
        perPage: 10
    }
}

const handleFetchQuestions = (state: QuestionState, action: PayloadAction<IDataPage<IQuestion>>) => {
    if (state?.lastPage === -1) {
        return update(state, {
            data: {
                $set: action?.payload?.data
            },
            lastPage: {
                $set: action?.payload?.pagination?.lastPage
            },
            pagesFetched: {
                $set: createPagesFetched(action?.payload?.pagination?.lastPage, action?.payload?.pagination?.currentPage)
            }
        });
    } else {
        return update(state, {
            data: {
                $push: action?.payload?.data
            },
            pagesFetched: {
                [action?.payload?.pagination?.currentPage]: {
                    $set: true
                }
            }
        })
    }

    return state;
}

const  createPagesFetched = (lastPage: number, currentPage: number) => {
    let retVal = new Array(lastPage).fill(false);
    retVal[0] = true;
    retVal[currentPage] = true;
    return retVal;
}

const reducers = (reducerBuilder) => {
    reducerBuilder.addCase(fetchQuestionsPageAsync.fulfilled, handleFetchQuestions);
}


export default createReducer(defaultState, reducers);