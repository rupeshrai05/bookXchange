import api from "./axios";

export const getShipmentApi = (exchangeId) =>
  api.get(`/api/shipments/${exchangeId}`);

export const addShipmentApi = (exchangeId, data) =>
  api.post(`/api/shipments/${exchangeId}`, data);

// Mark a shipment (by shipmentId) as delivered
export const markShipmentDeliveredApi = (shipmentId) =>
  api.post(`/api/shipments/${shipmentId}/delivered`);
