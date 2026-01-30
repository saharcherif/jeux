import { request } from './api';

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
    isActive: boolean;
    formationsCount?: number;
    createdAt: string;
    updatedAt: string;
}

export const categoriesApi = {
    getAll: () =>
        request<Category[]>('/categories'),

    getOne: (id: string) =>
        request<Category>(`/categories/${id}`),

    create: (data: FormData) =>
        request<Category>('/categories', {
            method: 'POST',
            data,
        }),

    update: (id: string, data: FormData) =>
        request<Category>(`/categories/${id}`, {
            method: 'PATCH',
            data,
        }),

    delete: (id: string) =>
        request<{ message: string }>(`/categories/${id}`, {
            method: 'DELETE',
        }),
};
