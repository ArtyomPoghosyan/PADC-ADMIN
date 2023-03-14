import { Api } from './../../service';

export const getAllTrainingRequest = () => {
    return Api.get("/trainings")
}
export const CurrentTrainingApi = (id) => {
    return Api.get(`/trainings/${id}`)
}

export const EditCurrentTrainingApi = (id:string | undefined,data:Object)=>{
    return Api.put(`/trainings/${id}`,data)
}

export const addTrainingApi =(data) => {
    return Api.post("/trainings",data)
}