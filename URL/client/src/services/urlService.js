import axiosInstance from "../utils/axiosConfig"



export const createShortUrl = async(url) => {
    return await axiosInstance.post("/api/url", url);
}

export const getAllUrls = async() => {
    return await axiosInstance.get("/api/url/list")
}

export const deleteUrl = async(id) => {
    return await axiosInstance.delete(`/api/url/${id}`)
}

export const updateUrl = async(id) => {
    return await axiosInstance.patch(`/api/url/${id}/status`)
}

