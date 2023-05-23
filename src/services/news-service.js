import axiosClient from "./apiClient";

export const getPosts = (page, limit) => {
    return axiosClient.get(`/posts?_page=${page}&_limit=${limit}`);
}

export const getPostById = (id) => {
    return axiosClient.get(`/posts/${id}`);
}
