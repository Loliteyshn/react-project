import { type } from "os";
import { Route, Routes } from "react-router-dom";
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileApi";
import { PhotosType, PostType, ProfileType } from "../components/types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    posts: [
        { id: 1, message: "Hy, how is your project", likesCount: 12 },
        { id: 2, message: "It`s my first post", likesCount: 11 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST":
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case "SN/PROFILE/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SN/PROFILE/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SN/PROFILE/DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {
                ...state,
                profile: { ...state.profile!, photos: action.photos }
            }
        default:
            return state;
    }
};

export const actions = {
    addPost: (newPostText: string) => ({ type: "SN/PROFILE/ADD-POST", newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: "SN/PROFILE/SET_USER_PROFILE", profile } as const),
    setStatus: (status: string) => ({ type: "SN/PROFILE/SET_STATUS", status } as const),
    deletePost: (postId: number) => ({ type: "SN/PROFILE/DELETE_POST", postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: "SN/PROFILE/SAVE_PHOTO_SUCCESS", photos } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    debugger
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        console.log('EROEJINGONG');
    }

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId) dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0]);
    }
}


export default profileReducer;