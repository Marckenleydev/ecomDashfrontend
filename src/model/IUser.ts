import { AffiliateStat } from "./IAffiliateStat"

export interface IUser {
    id: string
    name: string
    email: string
    password: string
    city: string
    state: string
    country: string
    occupation: string
    phoneNumber: string
    transactions: string[]
    affiliateStats: AffiliateStat[]
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    role: string;
    authorities: string;
}

export type Role = {role: string};
export type User ={user: IUser};
export type Users = {users: IUser[]};
