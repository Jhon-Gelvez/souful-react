import { categoryModel } from "../db/categoryModel.js";

export const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await categoryModel.addCategory(name);
        console.log(result);
        res.status(201).json({
            message: "Categoría creada con éxito",
            categoryId: result.insertId,
            name,
        });
    } catch (error) {
        res.status(500).json({ error: `Error al añadir categoría: ${error}` });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const result = await categoryModel.getAllCategories();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error al listar categorías: ${error}` });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await categoryModel.deleteCategory(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "La categoría no existe" });
        }

        res.status(200).json({
            message: `categoria eliminada`,
            id,
            affectedRows: result.affectedRows,
        });
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar categoria: ${error}` });
    }
};
