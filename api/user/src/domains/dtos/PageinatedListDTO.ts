export type PaginatedList<T> = {
    total: number;
    list: T[];
};

export type PaginationObj = {
    page: number;
    pageSize: number;
};
