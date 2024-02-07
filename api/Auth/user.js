import { api } from "@/api/index";
// Преобразовываем массив filters в объект filtersObj, где ключом является значение id, а значением - значение value и дальше передаем уже его
export default class UserService {
    static async userGetService(params) {
        return api({
            method: "GET",
            url: "api/user/",
        });
    }

    static async userPatchService(data) {
        return api({
            method: "PATCH",
            url: "api/user/",
            data: data,
        });
    }

    static async passwordPatchService(data) {
        return api({
            method: "PATCH",
            url: "api/user/change_password/",
            data: data,
        });
    }
}
