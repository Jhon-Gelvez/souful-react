import { handleFetch } from "../services/handleFetch.js";

const BASE_URL = import.meta.env.VITE_URL;
const API_URL = new URL("/api/images", BASE_URL).toString();
const HEADERS = { "Content-Type": "application/json" };

export const imagesApi = {
    get: async () => {
        return handleFetch(API_URL);
    },
    getById: async (id) => {
        return handleFetch(`${API_URL}/${id}`, { method: "GET", headers: HEADERS });
    },
    getByPublicId: async (publicId) => {
        return handleFetch(`${API_URL}/public/${publicId}`, { method: "GET", headers: HEADERS });
    },
    create: async (data) => {
        return handleFetch(API_URL, {
            method: "POST",
            body: data,
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
