import { db } from "../config/mysql.js";

//  anadir una nueva categoria
export const addCategory = async (req, res) => {
    const { name } = req.params;
    const sql = "INSERT INTO categories (name) VALUES (?)";
    try {
        const { result } = await db.query(sql, [name]);
        res.status(201).json({
            message: "Categoría creada con éxito",
            categoryId: result.insertId,
            name,
        });
    } catch (error) {
        console.error("Error al añadir categoría:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// obtener todas las categorias
export const getAllCategories = async (req, res) => {
    const sql = "SELECT * FROM categories";
    try {
        const [result] = await db.query(sql);
        res.json(result);
    } catch (error) {
        console.error("Error al listar categorías:", error);
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
};
