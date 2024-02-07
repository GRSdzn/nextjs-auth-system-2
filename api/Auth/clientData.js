import { api } from "@/api/index";
// Преобразовываем массив filters в объект filtersObj, где ключом является значение id, а значением - значение value и дальше передаем уже его
export default class ClientDataService {
    static async clientDataGetService(params) {
        return api({
            method: "POST",
            url: "auth/jwt/verify/",
        });
    }
}