import { IContact } from '@models/contacts/contacts';
import { AxiosResponse } from 'axios';
import { Api } from './../service';

export const contactRequest = ():Promise<AxiosResponse<IContact[]>> => {
    return Api.get<IContact[]>("/contact-requests");
};

export const currentcontact = (id):Promise<AxiosResponse<IContact[]>>  => {
    return Api.get<IContact[]>(`/contact-requests/${id}`);
};