import { AxiosResponse } from 'axios';
import { Api } from '@services/service';
import { IVacancie } from '@models/vacancies';

export const Vacancie = ():Promise<AxiosResponse<IVacancie[]>> => {
    return Api.get<IVacancie[]>("/vacancies")
}

export const EditVacancie = (id, data):Promise<AxiosResponse<IVacancie[]>> => {
    return Api.put<IVacancie[]>(`/vacancies/${id}`, data)
}

export const CurrentVacancie = (id):Promise<AxiosResponse<IVacancie[]>> => {
    return Api.get<IVacancie[]>(`/vacancies/${id}`)
}

export const AddVacancie = (data):Promise<AxiosResponse<IVacancie[]>> => {
    return Api.post<IVacancie[]>("/vacancies", data)
}