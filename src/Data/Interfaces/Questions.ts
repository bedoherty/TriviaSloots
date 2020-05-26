export interface IQuestion {
    _id: string;
    prompt: string;
    answers: string[];
}

export interface IFetchPageArgs {
    perPage: number;
    page: number;
}