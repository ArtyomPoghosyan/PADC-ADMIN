import { IToken } from '../../models/common';
import { Api } from '../../service';

export const VacancieApi = ():Promise<IToken<any>> => {
    return Api.get("/vacancies")
}

export const EditVacancieApi = (id, data):Promise<IToken<any>> => {
    return Api.put(`/vacancies/${id}`, data)
}

export const CurrentVacancieApi = (id):Promise<IToken<any>> => {
    return Api.get(`/vacancies/${id}`)
}

export const AddVacancieApi = (data):Promise<IToken<any>> => {
    return Api.post("/vacancies", data)
}