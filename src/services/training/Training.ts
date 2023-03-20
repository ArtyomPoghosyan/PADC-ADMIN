import { ITrainingData } from './../../models/trainings/trainings';
import { AxiosResponse } from 'axios';
import { IToken } from '../../models/common';
import { Api } from '../service';

export const getAllTrainingRequest = ():Promise<AxiosResponse<ITrainingData[]>> => {
    return Api.get<ITrainingData[]>("/trainings")
}
export const CurrentTrainingApi = (id):Promise<AxiosResponse<ITrainingData[]>> => {
    return Api.get<ITrainingData[]>(`/trainings/${id}`)
}

export const EditCurrentTrainingApi = (id: string | undefined, data: Object):Promise<AxiosResponse<ITrainingData[]>> => {
    return Api.put<ITrainingData[]>(`/trainings/${id}`, data)
}

export const addTrainingApi = (data):Promise<AxiosResponse<ITrainingData[]>> => {
    return Api.post<ITrainingData[]>("/trainings", data)
}