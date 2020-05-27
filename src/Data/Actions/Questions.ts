import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "../Objects/ActionTypes";
import { getQuestionsPage, createQuestion, updateQuestion } from "../API/Questions";
import { store } from "../Redux";
import { IQuestion } from "../Interfaces/Questions";

export const { ADD_QUESTIONS, CREATE_QUESTION, FETCH_QUESTIONS_PAGE, RESET_QUESTIONS, SET_TOTAL_PAGES, 
    SET_QUESTION_SEARCH, UPDATE_QUESTION } = ACTION_TYPES.Questions;

export const addQuestions = createAction<any>(ADD_QUESTIONS);

export const resetQuestions = createAction(RESET_QUESTIONS);

export const setTotalPages = createAction<number>(SET_TOTAL_PAGES)

export const setQuestionSearch = createAction<string>(SET_QUESTION_SEARCH);

export const fetchQuestionsPageAsync = createAsyncThunk(
    FETCH_QUESTIONS_PAGE,
    async () => {
        const { lastPage, pagesFetched, options: { perPage, search } } = store.getState().Questions;

        if (lastPage === -1) {
            return getQuestionsPage(perPage, 1, search);
        }

        return getQuestionsPage(perPage, pagesFetched.indexOf(false), search);
    }
)

export const createQuestionAsync = createAsyncThunk(
    CREATE_QUESTION,
    async (question: IQuestion) => {
        return createQuestion(question);
    }
);

export const updateQuestionAsync = createAsyncThunk(
    UPDATE_QUESTION,
    async (question: IQuestion) => {
        return updateQuestion(question);
    }
)