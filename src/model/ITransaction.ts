export interface ITransaction {
    id: string;
    userId: string;
    cost: string;
    products: string[];
    createdAt: string;
    updatedAt: string;
}
export type Transaction ={content: ITransaction};
export type Transactions ={content: ITransaction[]};