import { request } from './api';

export interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContactDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message?: string;
}

export const contactsApi = {
    getAll: () => {
        return request<Contact[]>('/contacts');
    },

    getOne: (id: string) => {
        return request<Contact>(`/contacts/${id}`);
    },

    create: (data: CreateContactDto) => {
        return request<Contact>('/contacts', {
            method: 'POST',
            data,
        });
    },

    delete: (id: string) => {
        return request<void>(`/contacts/${id}`, {
            method: 'DELETE',
        });
    },
};
