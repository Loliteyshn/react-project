import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "*",
        "API-KEY": "5db39c75-536c-45a4-bce1-2394093d0f6b"
    }
});

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type BasicResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}