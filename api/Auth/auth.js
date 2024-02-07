import { api } from "@/api";

export default class AuthService {
    static async token(data) {
        return api.post('/auth/jwt/verify/', data)
    }

    static async login(data) {
        return api.post('/auth/jwt/create/', data)
    }


    static async registration(data) {
        return api.post('/auth/users/', data, {
            withCredentials: true
        })
    }

}
