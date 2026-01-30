import { request } from './api';

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export interface AuthResponse {
    message: string;
    user: User;
    access_token: string;
}

export const authApi = {
    login: (data: any) =>
        request<AuthResponse>('/auth/login', {
            method: 'POST',
            data,
        }),

    register: (data: any) =>
        request<AuthResponse>('/auth/register', {
            method: 'POST',
            data,
        }),

    checkAuth: () =>
        request<AuthResponse>('/auth/check', {
            method: 'GET',
        }),

    logout: () =>
        request<{ message: string }>('/auth/logout', {
            method: 'POST',
        }),

    forgotPassword: (email: string) =>
        request<{ message: string }>('/auth/forgot-password', {
            method: 'POST',
            data: { email },
        }),
};
