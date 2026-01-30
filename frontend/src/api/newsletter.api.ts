import { request } from './api';

export interface NewsletterSubscription {
    _id: string;
    email: string;
    isActive: boolean;
    subscribedAt: string;
    createdAt: string;
    updatedAt: string;
}

export const newsletterApi = {
    subscribe: (email: string) =>
        request<NewsletterSubscription>('/newsletter/subscribe', {
            method: 'POST',
            data: { email },
        }),

    getAll: () =>
        request<NewsletterSubscription[]>('/newsletter/admin/all'),

    delete: (id: string) =>
        request<{ message: string }>(`/newsletter/${id}`, {
            method: 'DELETE',
        }),
};
