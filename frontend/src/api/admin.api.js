import api from "./axios";

export const getAllUsersApi = () => api.get("/api/admin/users");
export const banUserApi = (id) => api.patch(`/api/admin/users/${id}/ban`);

export const getAllBooksApi = () => api.get("/api/admin/books");
export const deleteBookApi = (id) => api.delete(`/api/admin/books/${id}`);

export const getAllExchangesApi = () => api.get("/api/admin/exchanges");
