import { instance } from "./api";

type GetCaptcha = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptcha>(`security/get-captcha-url`)
            .then(res => res.data);
    }
}