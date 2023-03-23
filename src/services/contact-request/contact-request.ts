import { Api } from './../service';
export const contactRequest = () => {
    return Api.get("/contact-requests")
}