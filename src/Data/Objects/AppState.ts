import { IUser } from "src/Data/Interfaces/User"

export class AppState {
    User: UserState;
}

export class UserState {
    user: IUser;
    token: string;
}