import { IUser } from "src/Data/Interfaces/User"
import { IPaginatedDataSet } from "src/Data/Objects/Pagination";
import { IQuestion } from "src/Data/Interfaces/Questions";

export class AppState {
    User: UserState;
    Questions: QuestionState;
}

export class UserState {
    user: IUser;
    token: string;
}

export class QuestionState extends IPaginatedDataSet<IQuestion>{
}