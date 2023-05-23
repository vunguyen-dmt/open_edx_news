import axiosClient from "./apiClient";

export function getPosts(page: number, limit: number){
    return axiosClient.get(`/posts?_page=${page}&_limit=${limit}`);
}

export function getPostById(id: number){
    return axiosClient.get(`/posts/${id}`);
}
