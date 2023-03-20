import { AxiosResponse } from "axios"
import { ILogin } from "../../models/auth"
import { Api } from "../service"

export const Login = (data: ILogin): Promise<AxiosResponse<ILogin[]>> => {
    return Api.post<ILogin[]>("/auth/login", data)
}