import api from "./axios";

export const getMessagesApi = (exchangeId) =>
  api.get(`/api/chats/${exchangeId}`);

export const sendMessageApi = (exchangeId, message) =>
  api.post(`/api/chats/${exchangeId}`, { message });
