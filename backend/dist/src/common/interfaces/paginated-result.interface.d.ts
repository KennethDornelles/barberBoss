export declare class PaginationMeta {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export declare class PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
    constructor(data: T[], total: number, page: number, limit: number);
}
