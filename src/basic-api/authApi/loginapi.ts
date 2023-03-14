
import { ILogin } from "src/interface"
import { Api } from "../../service"

export const LoginApi =(data:ILogin) => {
    return Api.post("/auth/login", data)
}