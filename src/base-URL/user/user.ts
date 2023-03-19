import { IToken } from '../../models/common';
import { Api } from '../../service';

export const GetAllUserApi = ():Promise<IToken<any>> => {
    return Api.get("/users")
}

export const getCurrentUser = (id):Promise<IToken<any>> => {
    return Api.get(`/users/${id}`)
}