import { Api } from './../../service';

export const GetAllUserApi = () => {
    return Api.get("/user/all")
}