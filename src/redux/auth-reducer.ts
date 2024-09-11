import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/authApi";
import { securityAPI } from "../api/securityApi";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Action } from "redux";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SN/auth/SET_USER_DATA":
        case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number, email: string, login: string, isAuth: boolean) => ({
        type: "SN/auth/SET_USER_DATA", payload: { userId, email, login, isAuth }
    }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: "SN/auth/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl } }),

}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = data.data
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaURL());
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}
export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha()
    const captchaURL = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaURL));
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(0, '', '', false));
    }
}

export default authReducer;