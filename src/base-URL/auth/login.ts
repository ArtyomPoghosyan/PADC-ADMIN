import { ILogin } from "../../models/auth"
import { IToken } from "../../models/common"
import { Api } from "../../service"

export const Login = (data: ILogin): Promise<IToken<any>> => {
    return Api.post("/auth/login", data)
}