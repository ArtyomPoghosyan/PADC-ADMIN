import { AxiosResponse } from 'axios';
import { Api } from '@services/service';
import { IuserData } from '@models/users/users';

export const GetAllUser = ():Promise<AxiosResponse<IuserData[]>> => {
    return Api.get<IuserData[]>("/users")
}

export const getCurrentUser = (id):Promise<AxiosResponse<IuserData[]>> => {
    return Api.get<IuserData[]>(`/users/${id}`)
}