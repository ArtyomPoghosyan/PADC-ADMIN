import { Api } from './../../service';

export const VacancieApi = () => {
    return Api.get("/vacancies")
}

export const EditVacancieApi = (id, data) => {
    return Api.put(`/vacancies/${id}`, data)
}

export const CurrentVacancieApi =(id)=> {
    return Api.get(`/vacancies/${id}`)
}

export const AddVacancieApi =(data) => {
    return Api.post("/vacancies",data)
}