import { IVacancie } from './../../models/vacancies/vacancies';
import { AxiosResponse } from 'axios';
import { IToken } from '../../models/common';
import { Api } from '../service';

export const VacancieApi = ():Promise<AxiosResponse<IVacancie[]>> => {
    return Api.get<IVacancie[]>("/vacancies")
}

export const EditVacancieApi = (id, data):Promise<AxiosResponse<IVacancie[]>> => {
    return Api.put<IVacancie[]>(`/vacancies/${id}`, data)
}

export const CurrentVacancieApi = (id):Promise<AxiosResponse<IVacancie[]>> => {
    return Api.get<IVacancie[]>(`/vacancies/${id}`)
}

export const AddVacancieApi = (data):Promise<AxiosResponse<IVacancie[]>> => {
    return Api.post<IVacancie[]>("/vacancies", data)
}