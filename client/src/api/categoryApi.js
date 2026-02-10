const URL = import.meta.env.VITE_URL;

export const getCategory = async () => {};
export const listCategories = async () => {
    try {
        const response = await fetch(`${URL}/api/categories`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando categorías:", error);
    }
};
export const createCategory = async () => {};
export const updateCategory = async () => {};
export const deleteCategory = async () => {};
