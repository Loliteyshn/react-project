import { AppStateType } from "./redux-store";

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}

export const getNewPostText = (state: AppStateType) => {
    return state.profilePage.newPostText;
}