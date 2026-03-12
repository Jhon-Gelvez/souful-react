const URL = import.meta.env.VITE_URL;

export const getCategory = async (id) => {
    try {
        const response = await fetch(`${URL}/api/categories/${id}`, {
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

export const listCategories = async () => {
    try {
        const response = await fetch(`${URL}/api/categories`);

        if (!response.ok) {
            throw new Error("Error al obtener el item");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error cargando categorías:", error);
    }
};
export const createCategory = async (categoryData) => {
    try {
        const response = await fetch(`${URL}/api/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
            throw new Error("Error al obtener la categoria");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await fetch(`${URL}/api/categories/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
            throw new Error("Error al obtener la categoria");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const deleteCategory = async (id) => {
    try {
        const response = await fetch(`${URL}/api/categories/${id}`, {
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
