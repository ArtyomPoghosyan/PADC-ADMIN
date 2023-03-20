import { AxiosResponse } from 'axios';
import { IuserData } from './../../models/users/users';
import { IToken } from '../../models/common';
import { Api } from '../service';

export const GetAllUser = ():Promise<AxiosResponse<IuserData[]>> => {
    return Api.get<IuserData[]>("/users")
}

export const getCurrentUser = (id):Promise<AxiosResponse<IuserData[]>> => {
    return Api.get<IuserData[]>(`/users/${id}`)
}