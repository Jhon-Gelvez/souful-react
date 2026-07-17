import { handleFetch } from "../services/handleFetch.js";

const BASE_URL = import.meta.env.VITE_URL;
const API_URL = new URL("/api/users", BASE_URL).toString();
const HEADERS = { "Content-Type": "application/json" };

export const usersApi = {
    get: async () => {
        return handleFetch(API_URL);
    },
    getById: async (id) => {
        return handleFetch(`${API_URL}/${id}`, { method: "GET", headers: HEADERS });
    },
    getByEmail: async (email) => {
        return handleFetch(`${API_URL}/email/${email}`, { method: "GET", headers: HEADERS });
    },
    getByName: async (name) => {
        return handleFetch(`${API_URL}/name/${name}`, { method: "GET", headers: HEADERS });
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
