import api from "./axios";

export const loginApi = (data) => api.post("/api/auth/login", data);

export const registerApi = (data) => api.post("/api/auth/register", data);

export const getMeApi = () => api.get("/api/users/me");
