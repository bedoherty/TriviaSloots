import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "../Objects/ActionTypes";
import { getQuestionsPage } from "../API/Questions";
import { IDataPage } from "../Interfaces/Pagination";
import { IQuestion, IFetchPageArgs } from "../Interfaces/Questions";
import { store } from "../Redux";

export const { ADD_QUESTIONS, FETCH_QUESTIONS_PAGE, RESET_QUESTIONS, SET_TOTAL_PAGES } = ACTION_TYPES.Questions;

export const addQuestions = createAction<any>(ADD_QUESTIONS);

export const resetQuestions = createAction(RESET_QUESTIONS);

export const setTotalPages = createAction<number>(SET_TOTAL_PAGES)

export const fetchQuestionsPageAsync = createAsyncThunk(
    FETCH_QUESTIONS_PAGE,
    async () => {
        const { lastPage, pagesFetched, options: { perPage } } = store.getState().Questions;

        if (lastPage === -1) {
            return getQuestionsPage(perPage, 1);
        }

        return getQuestionsPage(perPage, pagesFetched.indexOf(false));
    }
)