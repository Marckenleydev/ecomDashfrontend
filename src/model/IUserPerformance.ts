import { User } from "./IUser"

export interface IUserPerformance {
    user: User
    sales: Sale[]
  }

  export interface Sale {
    id: string
    userId: string
    cost: string
    products: string[]
    createdAt: string
    updatedAt: string
  }

  export type UserPerformance ={userPerformance: IUserPerformance};