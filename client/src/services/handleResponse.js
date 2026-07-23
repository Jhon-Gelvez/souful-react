// fix lanzar una exepcion

export const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = "Unknown error";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            errorMessage = response.statusText;
        }
        const fullError = `Fetch error ${response.status}: ${errorMessage}`;
        console.error(fullError);
        return fullError;
    }
    return await response.json();
};