import { IToken } from '../../models/common';
import { Api } from '../../service';

export const getAllTrainingRequest = ():Promise<IToken<any>> => {
    return Api.get("/trainings")
}
export const CurrentTrainingApi = (id):Promise<IToken<any>> => {
    return Api.get(`/trainings/${id}`)
}

export const EditCurrentTrainingApi = (id: string | undefined, data: Object):Promise<IToken<any>> => {
    return Api.put(`/trainings/${id}`, data)
}

export const addTrainingApi = (data):Promise<IToken<any>> => {
    return Api.post("/trainings", data)
}