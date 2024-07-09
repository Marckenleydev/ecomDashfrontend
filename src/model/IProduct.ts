import { IProductStat } from "./IProductStat"

export interface IProduct {
    id: string
    name: string
    price: number
    description: string
    category: string
    rating: number
    supply: number
    createdAt: string
    updatedAt: string
    productStats: IProductStat[];
  }
  

  
  export type Query = {page: number, size: number,sort?: string,search?: string}
  export type Product ={product: IProduct};
export type Products = {products: IProduct[]};