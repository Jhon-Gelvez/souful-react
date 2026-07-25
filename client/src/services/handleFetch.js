const handleResponseError = async (response) => {
    if (!response.ok) {
        let errorMessage = "Unknown error";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            errorMessage = response.statusText;
        }
        throw new Error(`Fetch error ${response.status}: ${errorMessage}`);
    }
    return await response.json();
};

export const handleFetch = async (url, options = {}) => {
    const response = await fetch(url, options);
    return await handleResponseError(response);
};
