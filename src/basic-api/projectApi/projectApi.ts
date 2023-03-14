import { Api } from './../../service';

export const Projectapi = () => {
    return Api.get("/projects/all")
}