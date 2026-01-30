export const BASE_URL = 'https://api.mon-espace.msit-demo.fr';

interface RequestOptions extends RequestInit {
    data?: any;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { data, ...customConfig } = options;
    const token = localStorage.getItem('access_token');

    const headers: Record<string, string> = {};

    if (!(data instanceof FormData) && !(customConfig.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        credentials: 'include', // Important for cookies
    };

    if (data) {
        config.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        // Optional: Handle unauthorized (e.g., clear token)
        // localStorage.removeItem('access_token');
    }

    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        throw new Error(result.message || 'Something went wrong');
    }
}
