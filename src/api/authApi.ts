import { instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum } from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    async me() {
        // const response = await instance.get<MeResponseType>(`auth/me`);
        return (await instance.get<ResponseType<MeResponseDataType>>(`auth/me`)).data
    },
    async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return (await instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })).data
    },
    async logout() {
        return (await instance.delete(`auth/login`));
    }
}