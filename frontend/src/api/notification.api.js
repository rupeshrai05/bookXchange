import api from "./axios";

export const getNotificationsApi = () => api.get("/api/notifications");
export const markReadApi = (id) => api.post(`/api/notifications/${id}/read`);
