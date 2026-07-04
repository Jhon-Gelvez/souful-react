// todo adaptar la edicion para cambiar la categoria asociada al item
// fix ciando solo se pone la caategoria a cambiar salta la alerta que no hay nada para cambiar

const URL = import.meta.env.VITE_URL;

const handleResponse = async (response, context) => {
    if (!response.ok) {
        let errorMessage = "Error desconocido";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            errorMessage = response.statusText;
        }

        const fullError = `[${context}] Falló ${response.status}: ${errorMessage}`;
        console.error(fullError);
        throw new Error(fullError);
    }
    return await response.json();
};

export const getItem = async (public_id) => {
    try {
        const response = await fetch(`${URL}/api/items/${public_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return await handleResponse(response, "getItem");
    } catch (error) {
        throw error;
    }
};

export const listItems = async () => {
    try {
        const response = await fetch(`${URL}/api/items`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return await handleResponse(response, "listItems");
    } catch (error) {
        throw error;
    }
};

export const createItem = async (itemData) => {
    try {
        const response = await fetch(`${URL}/api/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
        });
        return await handleResponse(response, "createItem");
    } catch (error) {
        throw error;
    }
};

export const updateItem = async (public_id, itemData) => {
    try {
        const response = await fetch(`${URL}/api/items/${public_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
        });
        return await handleResponse(response, "updateItem");
    } catch (error) {
        throw error;
    }
};

export const deleteItem = async (publicId) => {
    try {
        // Nota: Asegúrate de pasar el publicId en la URL si tu API lo requiere
        const response = await fetch(`${URL}/api/items/${publicId}`, {
            method: "DELETE",
        });
        return await handleResponse(response, "deleteItem");
    } catch (error) {
        throw error;
    }
};
