import { IUser } from "./IUser";

export interface IUserRequest {
    email: string;
    password?:string;
}

export interface IRegisterRequest extends IUserRequest {
    name:string;
    phone?:string;
    bio?:string;
}


export type EmailAddress = Pick<IUserRequest, "email">;
export type UpdatePassword =Pick<IUserRequest, "password"> &{newPassword:string, confirmNewPassword:string};
export type UpdateNewPassword = Pick<IUser, "id"> & UpdatePassword;