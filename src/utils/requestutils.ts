import { Key } from '../components/enum/cache.key';
import { IResponse } from '../model/IResponse';

export const BASE_URL="https://spring-ecomvisionci-cd-pipeline-production.up.railway.app/api"

export const isJsonContentType = (headers: Headers)=>
     [
        'application/vnd.api+json',
         'application/json',
          'application/vnd.hal+json',
           'application/pdf',
            'application/form-data'].includes(headers.get('content-type')?.trimEnd() || '');


 export const processResponse = <T>(response: IResponse<T>, meta:unknown, arg: unknown): IResponse<T> =>{
    const {request} = meta;
    if(request.url.includes('logout')){localStorage.removeItem(Key.LOGGEDIN);}

    if(!request.url.includes('profile')){
        // show toast notification
    }
    console.log({response})
    return response;

 }


 export const processError = (error: {status:number; data:IResponse<void>}, meta: unknown, arg:unknown):{status:number; data:IResponse<void>}=>{

    if(error.data.code === 401 && error.data.status ==="UNAUTHORIZED" && error.data.message === "You are not logged in"){
        localStorage.setItem(Key.LOGGEDIN,"false");
    }

    console.log({error});
    return error;
 }