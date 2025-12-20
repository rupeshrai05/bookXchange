import api from "./axios";

export const getAllBooksApi = () => api.get("/api/books");

export const getMyBooksApi = () => api.get("/api/books/mine");

export const addBookApi = (formData) =>
  api.post("/api/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
