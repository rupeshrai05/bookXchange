import axios from "./axios";

// ✅ GET MY EXCHANGES
export const getMyExchangesApi = () => {
  return axios.get("/api/exchanges/mine");
};

// ✅ GET EXCHANGE BY ID
export const getExchangeByIdApi = (id) => {
  return axios.get(`/api/exchanges/${id}`);
};

// ✅ REQUEST EXCHANGE (🔥 THIS WAS MISSING)
export const requestExchangeApi = (data) => {
  return axios.post("/api/exchanges", data);
};

// ✅ ACCEPT EXCHANGE
export const acceptExchangeApi = (id) => {
  return axios.post(`/api/exchanges/${id}/accept`);
};

// ✅ REJECT EXCHANGE
export const rejectExchangeApi = (id) => {
  return axios.post(`/api/exchanges/${id}/reject`);
};
