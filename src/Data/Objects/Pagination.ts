export class IPaginatedDataSet<T> {
    data: T[];
    lastPage: number;
    pagesFetched: boolean[];
    options: {
        perPage: number
    }
}