import { db } from "../config/mysql.js";

export const categoryModel = {
    addCategory: async (name) => {
        const sql = "INSERT INTO categories (name) VALUES (?)";
        const result = await db.query(sql, [name]);
        return result[0];
    },
    getAllCategories: async () => {
        const sql = "SELECT * FROM categories";
        const [result] = await db.query(sql);
        return result;
    },
    deleteCategory: async (id) => {
        const sql = "DELETE FROM categories WHERE id = ?";
        const [result] = await db.query(sql, id)
        return result
    },
};
