import { store } from "../Redux"
import { GET, PUT, POST } from "./Request";
import { IDataPage } from "../Interfaces/Pagination";
import { IQuestion } from "../Interfaces/Questions";

export const getQuestionsPage = (perPage: number, page: number, search?: string) => {
    return GET("questions/list", {
        perPage,
        page,
        search
    });
}

export const createQuestion = (question: IQuestion) => {
    return PUT("questions", question);
}

export const updateQuestion = (question: IQuestion) => {
    return POST(`questions/${ question._id }`, question);
}