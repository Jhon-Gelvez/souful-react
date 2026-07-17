// In a new file, e.g., ../services/apiClient.js
import { handleResponse } from "./handleResponse.js";

export const handleFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        return await handleResponse(response);
    } catch (error) {
        return {
            ok: false,
            error: "Network error",
            message: error.message
        };
    }
};