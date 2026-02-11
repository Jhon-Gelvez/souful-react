import { db } from "../config/mysql.js";

export const itemModel = {
    getItem: async (public_id) => {
        const sql = "SELECT * FROM product_images WHERE public_id = ?";
        const [result] = await db.query(sql, [public_id]);
        return result;
    },
    getAllItemsDB: async () => {
        const sql = "SELECT * FROM product_images";
        const [result] = await db.query(sql);
        return result;
    },
    createItemDB: async (data) => {
        // data es un objeto que ya incluye el id generado
        const fields = Object.keys(data);
        const values = Object.values(data);

        // Creamos los placeholders (?, ?, ?) dinámicamente
        const placeholders = fields.map(() => "?").join(", ");
        const columnNames = fields.join(", ");

        const sql = `INSERT INTO product_images (${columnNames}) VALUES (${placeholders})`;

        const [result] = await db.query(sql, values);
        return result;
    },
    updateItemDB: async (public_id, data) => {
        // 1. Extraemos las llaves (nombres de campos) que vienen en el objeto
        const fields = Object.keys(data);
        if (fields.length === 0) return null; // No hay nada que actualizar

        // 2. Construimos la parte "SET campo1 = ?, campo2 = ?"
        const setQuery = fields.map((field) => `${field} = ?`).join(", ");

        // 3. Los valores en orden, agregando el ID al final para el WHERE
        const values = [...Object.values(data), public_id];

        const sql = `UPDATE product_images SET ${setQuery} WHERE public_id = ?`;

        const [result] = await db.query(sql, values);
        return result;
    },
    deleteItemDB_cdl: async (public_id) => {
        const sql = "DELETE FROM product_images WHERE public_id = ?";

        const [result] = await db.query(sql, [public_id]);

        return result;
    },
};
