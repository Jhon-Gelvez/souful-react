import { db } from "../config/mysql.js";

export const categoryModel = {
    getCategory: async (id) => {
        const sql = "SELECT * FROM categories WHERE id = ?";
        const [result] = await db.query(sql);
        return result;
    },

    getAllCategories: async () => {
        const sql = "SELECT * FROM categories";
        const [result] = await db.query(sql);
        return result;
    },
    addCategory: async (name) => {
        const sql = "INSERT INTO categories (name) VALUES (?)";
        const result = await db.query(sql, [name]);
        return result[0];
    },
    deleteCategory: async (id) => {
        const sql = "DELETE FROM categories WHERE id = ?";
        const [result] = await db.query(sql, id);
        return result;
    },
    updateCategory: async (id, name) => {
        const sql = "UPDATE categories SET name = ? WHERE id = ?";
        const [result] = await db.query(sql, [name, id]);
        return result;
    },
};
