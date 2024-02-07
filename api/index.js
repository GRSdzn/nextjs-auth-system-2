import axios from "axios";
import { setCookie, getCookie } from 'cookies-next';
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const API_URL = process.env.NEXT_PUBLIC_HOST_API;
axios.defaults.withCredentials = true;
export const api = axios.create({
    baseURL: API_URL,
    timeout: 25000,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const accessToken = getCookie('access');
    const csrfToken = getCookie('csrftoken');

    if (accessToken) {
        config.headers.Authorization = `JWT ${accessToken}`;
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
});

api.interceptors.response.use(

    (response) => {
        return response;
    },

    async (error) => {
        const router = useRouter()
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                const refreshedResponse = await axios.post(`${API_URL}/auth/jwt/verify/`, { refresh: getCookie('refresh') }, {
                    withCredentials: false,
                    headers: {
                        Authorization: `JWT ${getCookie('refresh')}`,
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                router.push('/dashboard')

                setCookie('access', refreshedResponse.data?.access);
                setCookie('refresh', refreshedResponse.data?.refresh);

                return api.request(originalRequest);
            } catch (err) {
                console.log('Ошибка обновления токена доступа', err);
            }
        }

        return Promise.reject(error);
    }
);

const queryClient = new QueryClient();
export { queryClient };