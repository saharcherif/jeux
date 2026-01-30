import { request } from './api';

export interface Inscription {
    _id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    city: string;
    educationLevel: string;
    status: string;
    courseInterest: string;
    modality: 'onsite' | 'online';
    createdAt: string;
    updatedAt: string;
}

export interface CreateInscriptionDto {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    city: string;
    educationLevel: string;
    status: string;
    courseInterest: string;
    modality: 'onsite' | 'online';
}

export const inscriptionsApi = {
    getAll: () => {
        return request<Inscription[]>('/inscriptions');
    },

    getOne: (id: string) => {
        return request<Inscription>(`/inscriptions/${id}`);
    },

    create: (data: CreateInscriptionDto) => {
        return request<Inscription>('/inscriptions', {
            method: 'POST',
            data,
        });
    },

    delete: (id: string) => {
        return request<void>(`/inscriptions/${id}`, {
            method: 'DELETE',
        });
    },
};
