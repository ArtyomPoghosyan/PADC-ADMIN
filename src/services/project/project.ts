import { IProjectData } from './../../models/projects/projects';
import { AxiosResponse } from 'axios';
import { IToken } from '../../models/common';
import { Api } from '../service';

export const Projectapi = ():Promise<AxiosResponse<IProjectData[]>> => {
    return Api.get<IProjectData[]>("/projects/")
}

export const currentProjectAPi = (id):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.get<IProjectData[]>(`projects/${id}`)
}

export const editCurentProjectAPi = (id, data):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.put<IProjectData[]>(`/projects/${id}`, data)
}

export const addProjectApi = (data):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.post<IProjectData[]>("/projects", data)
}