import { request } from './api';

export interface Training {
    _id: string;
    title: string;
    description: string;
    level?: string;
    instructor?: string;
    instructorName?: string;
    instructorTitle?: string;
    instructorDescription?: string;
    instructorPhoto?: string;
    category: string;
    hours: number;
    program?: string;
    modules?: Array<{
        moduleName: string;
        topics: string[];
    }>;
    price: number;
    discount?: number;
    image?: string;
    startDate?: string;
    endDate?: string;
    days?: string;
    time?: string;
    location?: string;
    maxParticipants?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    rating?: number;
    reviewsCount?: number;
    studentsCount?: number;
}

export const trainingsApi = {
    getAll: (admin = false) =>
        request<Training[]>(admin ? '/trainings/admin/all' : '/trainings'),

    getOne: (id: string) =>
        request<Training>(`/trainings/${id}`),

    create: (data: FormData) =>
        request<Training>('/trainings', {
            method: 'POST',
            data,
        }),

    update: (id: string, data: FormData) =>
        request<Training>(`/trainings/${id}`, {
            method: 'PATCH',
            data,
        }),

    delete: (id: string) =>
        request<{ message: string }>(`/trainings/${id}`, {
            method: 'DELETE',
        }),
};
