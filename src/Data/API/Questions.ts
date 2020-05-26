import { store } from "../Redux"
import { GET } from "./Request";
import { IDataPage } from "../Interfaces/Pagination";
import { IQuestion } from "../Interfaces/Questions";

export const getQuestionsPage = (perPage: number, page: number) => {
    return GET("questions/list", {
        perPage,
        page
    });
}