import { Api } from './../service';

export const contactRequest = () => {
    return Api.get("/contact-requests");
};

export const currentcontact = (id)  => {
    return Api.get(`/contact-requests/${id}`);
};