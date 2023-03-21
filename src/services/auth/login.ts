import { ILogin } from "@models/auth"
import { Api } from "@services/service"
import { AxiosResponse } from "axios"

export const Login = (data: ILogin): Promise<AxiosResponse<ILogin[]>> => {
    return Api.post<ILogin[]>("/auth/login", data)
}