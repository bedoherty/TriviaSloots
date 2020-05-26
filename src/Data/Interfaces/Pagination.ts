export interface IDataPage<T> {
    data: T[];
    pagination: {
        currentPage: number,
        lastPage: number
    }
}