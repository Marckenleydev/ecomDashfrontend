export interface Page {
    number: number;
    totalElements: number;
    totalPages: number;
    size: number;
   
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface IPage<T> {

    content: T[];
    number: number;
    sort: Sort;
    numberOfElements: number;
    page: Page;

}

