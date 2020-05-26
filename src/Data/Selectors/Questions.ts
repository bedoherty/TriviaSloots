import { AppState, QuestionState } from "src/Data/Objects/AppState";
import { createSelector } from "@reduxjs/toolkit";

// Local Helpers for Selection
const getQuestionState = (appState: AppState) => {
    return appState?.Questions;
}

const getQuestions = (questionState: QuestionState) => {
    return questionState?.data;
}

// Memoized selectors for exporting to be used in React
export const getAllQuestions = createSelector(
    getQuestionState,
    getQuestions
)