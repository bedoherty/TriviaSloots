import { createReducer, PayloadAction, Action } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { ACTION_TYPES } from "src/Data/Objects/ActionTypes";
import { QuestionState } from "src/Data/Objects/AppState";
import { IDataPage } from "../Interfaces/Pagination";
import { IQuestion } from "../Interfaces/Questions";
import { fetchQuestionsPageAsync, RESET_QUESTIONS, createQuestionAsync, updateQuestionAsync } from "../Actions/Questions";

const { SET_QUESTION_SEARCH } = ACTION_TYPES.Questions;

const defaultState: QuestionState = {
    data: [],
    lastPage: -1,
    pagesFetched: [],
    options: {
        perPage: 10,
        search: ""
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

const setQuestionSearch = (state: QuestionState, action: PayloadAction<string>) => {
    if (action?.payload) {
        return update(state, {
            options: {
                search: {
                    $set: action?.payload
                }
            }
        })
    }

    return state;
}

const resetQuestions = (state: QuestionState, action: Action) => {
    return defaultState;
}

const createQuestion = (state: QuestionState, action: PayloadAction<IQuestion>) => {
    if (!action?.payload) {
        return state;
    }

    return update(state, {
        data: {
            $unshift: [ action?.payload ]
        }
    })
}

const updateQuestion = (state: QuestionState, action: PayloadAction<IQuestion>) => {
    if (!action?.payload) {
        return state;
    }

    return update(state, {
        data: {
            $apply: (oldData: IQuestion[]) => oldData.map((question: IQuestion) => {
                const newQuestion = action?.payload;
                if (newQuestion._id === question._id) {
                    return newQuestion;
                }

                return question;
            })
        }
    });
}

const  createPagesFetched = (lastPage: number, currentPage: number) => {
    let retVal = new Array(lastPage).fill(false);
    retVal[0] = true;
    retVal[currentPage] = true;
    return retVal;
}

const reducers = (reducerBuilder) => {
    reducerBuilder.addCase(fetchQuestionsPageAsync.fulfilled, handleFetchQuestions);
    reducerBuilder.addCase(createQuestionAsync.fulfilled, createQuestion);
    reducerBuilder.addCase(updateQuestionAsync.fulfilled, updateQuestion);
    reducerBuilder.addCase(SET_QUESTION_SEARCH, setQuestionSearch);
    reducerBuilder.addCase(RESET_QUESTIONS, resetQuestions);
}


export default createReducer(defaultState, reducers);