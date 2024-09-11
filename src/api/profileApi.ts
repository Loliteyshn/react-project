import { PhotosType, ProfileType } from "../components/types/types";
import { instance, ResponseType } from "./api";

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    async getUserProfile(userId: number) {
        return (await instance.get<ProfileType>(`profile/` + userId)).data
    },
    async getStatus(userId: number) {
        return (await instance.get<string>(`profile/status/` + userId)).data
    },
    async updateStatus(status: string) {
        return (await instance.put<ResponseType>(`profile/status`, { status: status })).data
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const response = await instance.put<ResponseType<PhotosType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    },
    async saveProfile(profile: ProfileType) {
        return (await instance.put<ResponseType<SavePhotoResponseType>>(`profile`, profile)).data
    }
}