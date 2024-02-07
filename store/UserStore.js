// queries
import axios from "axios";
import { API_URL } from "@/api";
import AuthService from "@/api/Auth/auth";
// cookies
import { deleteCookie, getCookie, setCookie } from "cookies-next";
// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from 'zustand/middleware'
// others
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export const useUserStore = createWithEqualityFn(devtools((set, get) => ({
    user: {}, isAuth: false, loading: false, isToken: !!getCookie('access'),
    register: async (data) => {
        set({ loading: true });
        try {
            const response = await AuthService.registration(data);

            setCookie('access', response.data?.access);
            setCookie('refresh', response.data?.refresh);

            toast.success('Запрос на регистрацию отправлен');

            router.push('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Ошибка Регистрации');
        } finally {
            set({ loading: false });
        }
    },

    // Update the definition of the `login` function in `useUserStore`
    login: async (data, router) => {  // Add the `router` parameter
        set({ loading: true });
        try {
            const response = await AuthService.login(data);

            setCookie('access', response.data?.access);
            setCookie('refresh', response.data?.refresh);

            set({ user: { ...response.data } });
            set({ isAuth: true });

            // Redirect the user to the main page upon successful login
            router.push('/'); // Assuming `/` is the path to your main page
        } catch (error) {
            const errorMessage = error?.response?.status ? `Authentication Error: ${error.response.status}` : error.message;
            toast.error(errorMessage);
            set({ isAuth: false });
        } finally {
            set({ loading: false });
        }
    },

    tryAuth: async (data) => {
        set({ loading: true })
        try {
            const response = await axios.post(`${API_URL}auth/jwt/verify/`, {
                token: getCookie('refresh')
            })
            try {
                // const loginResponse = await AuthService.login();
                // set({ user: { ...loginResponse.data } })
                set({ isAuth: true })

            } catch (e) {
                console.log('Ошибка при получении пользователя', e)
            }
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            set({ loading: false })
        }
        // return get('user')
    },

    logout: async (data) => {
        set({ loading: true });
        try {
            set({ user: {}, isAuth: false });
            deleteCookie('access');
            deleteCookie('csrftoken');
            deleteCookie('refresh');
        } catch (error) {
            console.log(error.response?.data?.message);
        } finally {
            set({ loading: false });
        }

        return get('user');
    },
})));

