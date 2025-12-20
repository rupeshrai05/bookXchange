import api from "./axios";

export const createReportApi = (data) => api.post("/api/reports", data);
export const getAllReportsApi = () => api.get("/api/reports");
export const resolveReportApi = (id) => api.patch(`/api/reports/${id}/resolve`);
