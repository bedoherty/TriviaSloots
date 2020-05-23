export interface IUser {
    email: string;
    email_verified: boolean;
    name: string;
    nickname: string;
    picture: string;
    sub: string;
    updated_at: string;
}

// Redux Dispatch Payloads
export interface ILoginUserPayload {
    user: IUser;
    token: string;
}