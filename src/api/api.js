import axios from "axios";
import Login from "../components/login/Login";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "*",
        "API-KEY": "5db39c75-536c-45a4-bce1-2394093d0f6b"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page${currentPage}&count=${pageSize}`)
            .then(reponse => reponse.data);
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(reponse => reponse.data);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(reponse => reponse.data);
    },
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
            .then(response => response.data);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}