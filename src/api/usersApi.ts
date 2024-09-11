import { UsersType } from "../components/types/types";
import { BasicResponseType, instance, ResponseType } from "./api";

export type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string
}

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return (await instance.get<GetUsersResponseType>
            (`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))).data
    },
    async follow(userId: number) {
        return (await instance.post<ResponseType>(`follow/${userId}`)).data
    },
    async unfollow(userId: number) {
        return (await instance.delete<ResponseType>(`follow/${userId}`)).data
    },
}