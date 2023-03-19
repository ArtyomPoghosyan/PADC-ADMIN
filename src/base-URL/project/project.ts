import { IToken } from '../../models/common';
import { Api } from '../../service';

export const Projectapi = ():Promise<IToken<any>> => {
    return Api.get("/projects/")
}

export const currentProjectAPi = (id):Promise<IToken<any>> => {
    return Api.get(`projects/${id}`)
}

export const editCurentProjectAPi = (id, data):Promise<IToken<any>> => {
    return Api.put(`/projects/${id}`, data)
}

export const addProjectApi = (data):Promise<IToken<any>> => {
    return Api.post("/projects", data)
}