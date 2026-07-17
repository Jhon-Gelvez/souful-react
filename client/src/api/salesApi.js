import { handleFetch } from "../services/handleFetch.js";

const BASE_URL = import.meta.env.VITE_URL;
const API_URL = new URL("/api/sales", BASE_URL).toString();
const HEADERS = { "Content-Type": "application/json" };

export const salesApi = {
    get: async () => {
        return handleFetch(API_URL);
    },
    getById: async (id) => {
        return handleFetch(`${API_URL}/${id}`, { method: "GET", headers: HEADERS });
    },
    getByUser: async (userId) => {
        return handleFetch(`${API_URL}/user/${userId}`, { method: "GET", headers: HEADERS });
    },
    getByProduct: async (productId) => {
        return handleFetch(`${API_URL}/product/${productId}`, { method: "GET", headers: HEADERS });
    },
    create: async (data) => {
        return handleFetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(data),
        });
    },
    delete: async (id) => {
        return handleFetch(`${API_URL}/${id}`, { method: "DELETE" });
    },
};
