import axiosInstance from "../utils/axiosConfig"

export const getCustomDomain = async() => {
    return await axiosInstance.get("/customDomain")
}

export const getCustomUrlsByDomain = async(domainId) => {
    return await axiosInstance.get(`/api/customUrl/domain/${domainId}`)
}

export const getAllCustomUrls = async() => {
    return await axiosInstance.get("/api/customUrl/list")
}

export const createCustomDomain = async(formData) => {
    return await axiosInstance.post(`/customDomain`, formData)
}

export const createCustomUrl = async(formData) => {
    return await axiosInstance.post(`/api/customUrl`, formData)
}

export const deleteCustomDomain = async(id) => {
    return await axiosInstance.delete(`/customDomain/${id}`)
}

export const deleteCustomUrl = async(id) => {
    return await axiosInstance.delete(`/api/customUrl/${id}`)
}

export const updateCustomUrl = async(id) => {
    return await axiosInstance.patch(`/api/customUrl/${id}/status`)
}





