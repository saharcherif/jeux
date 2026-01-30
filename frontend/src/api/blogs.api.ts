import { request } from './api';

export interface Blog {
    _id: string;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    image?: string;
    category: string;
    isActive: boolean;
    publishedAt?: string;
    views?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBlogDto {
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    category: string;
    isActive?: boolean;
}

export const blogsApi = {
    getAll: (admin = false) => {
        const endpoint = admin ? '/news/admin/all' : '/news';
        return request<Blog[]>(endpoint);
    },

    getOne: (id: string) => {
        return request<Blog>(`/news/${id}`);
    },

    create: (data: FormData) => {
        return request<Blog>('/news', {
            method: 'POST',
            data,
        });
    },

    update: (id: string, data: FormData) => {
        return request<Blog>(`/news/${id}`, {
            method: 'PATCH',
            data,
        });
    },

    delete: (id: string) => {
        return request<void>(`/news/${id}`, {
            method: 'DELETE',
        });
    },
};
