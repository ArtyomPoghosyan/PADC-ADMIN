import { IProjectData } from '@models/projects';
import { Api } from '@services/service';
import { AxiosResponse } from 'axios';

export const Project = (): Promise<AxiosResponse<IProjectData[]>> => {
    return Api.get<IProjectData[]>("/projects/")
}

export const currentProject = (id): Promise<AxiosResponse<IProjectData[]>> => {
    return Api.get<IProjectData[]>(`projects/${id}`)
}

export const editCurentProject = (id, data): Promise<AxiosResponse<IProjectData[]>> => {
    return Api.put<IProjectData[]>(`/projects/${id}`, data)
}

export const addProject = (data): Promise<AxiosResponse<IProjectData[]>> => {
    return Api.post<IProjectData[]>("/projects", data)
}

export const deleteProject = (id):Promise<AxiosResponse<IProjectData[]>> => {
    return Api.delete<IProjectData[]>(`/projects/${id}`)
}