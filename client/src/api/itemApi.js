const URL = import.meta.env.VITE_URL;

export const getItem = async (public_id) => {
    try {
        const response = await fetch(`${URL}/api/items/${public_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Error al obtener el item");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const listItems = async () => {
    try {
        const response = await fetch(`${URL}/api/items`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Error al obtener el item");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const createItem = async (itemData) => {
    try {
        const response = await fetch(`${URL}/api/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            throw new Error("Error al obtener el item");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const updateItem = async (public_id, itemData) => {
    try {
        const response = await fetch(`${URL}/api/items/${public_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            throw new Error("Error al obtener el item");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const deleteItem = async (publicId) => {
    try {
        const response = await fetch(`${URL}/api/items`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al obtener el item");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
