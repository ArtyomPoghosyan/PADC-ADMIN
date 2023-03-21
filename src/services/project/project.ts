import { IProjectData } from './../../models/projects/projects';
import { AxiosResponse } from 'axios';
import { Api } from '../service';

export const Project = ():Promise<AxiosResponse<IProjectData[]>> => {
    return Api.get<IProjectData[]>("/projects/")
}

export const currentProject = (id):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.get<IProjectData[]>(`projects/${id}`)
}

export const editCurentProject = (id, data):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.put<IProjectData[]>(`/projects/${id}`, data)
}

export const addProject = (data):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.post<IProjectData[]>("/projects", data)
}