import { handleFetch } from "../services/handleFetch.js";

const BASE_URL = import.meta.env.VITE_URL;
const API_URL = new URL("/api/product-records", BASE_URL).toString();
const HEADERS = { "Content-Type": "application/json" };

export const productRecordsApi = {
    get: async () => {
        return handleFetch(API_URL);
    },
    getById: async (id) => {
        return handleFetch(`${API_URL}/${id}`, { method: "GET", headers: HEADERS });
    },
    getByActive: async () => {
        return handleFetch(`${API_URL}/active`, { method: "GET", headers: HEADERS });
    },
    getByInactive: async () => {
        return handleFetch(`${API_URL}/inactive`, { method: "GET", headers: HEADERS });
    },
    getByCategory: async (categoryId) => {
        return handleFetch(`${API_URL}/category/${categoryId}`, { method: "GET", headers: HEADERS });
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
    update: async (id, data) => {
        return handleFetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(data),
        });
    },
    delete: async (id) => {
        return handleFetch(`${API_URL}/${id}`, { method: "DELETE" });
    },
};
