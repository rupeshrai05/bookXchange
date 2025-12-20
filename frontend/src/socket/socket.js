import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:5001";
  socket = io(url, {
    auth: { token },
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect error", err?.message || err);
  });

  return socket;
};

export const joinExchangeRoom = (exchangeId) => {
  if (!socket) return;
  try {
    socket.emit("join-exchange", exchangeId);
  } catch (err) {
    console.warn("Failed to join exchange room", err);
  }
};

export const onNewMessage = (callback) => {
  if (!socket) return;
  socket.on("new-message", callback);
};

export const sendSocketMessage = () => { }; // optional later

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
