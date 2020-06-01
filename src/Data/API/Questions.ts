import { store } from "../Redux"
import { GET, PUT, POST } from "./Request";
import { IDataPage } from "../Interfaces/Pagination";
import { IQuestion } from "../Interfaces/Questions";

export const getQuestionsPage = (perPage: number, page: number, search?: string) => {
    const options = {
        perPage,
        page,
        search
    };

    if (search?.length === 0) {
        delete options.search;
    }

    return GET("questions/list", options);
}

export const createQuestion = (question: IQuestion) => {
    return PUT("questions", question);
}

export const updateQuestion = (question: IQuestion) => {
    return POST(`questions/${ question._id }`, question);
}