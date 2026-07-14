import { db } from "../config/mysql.js";

export const categoryModel = {
    get: async () => {
        const sql = "SELECT * FROM categories";
        const [result] = await db.query(sql);
        return result;
    },
    getById: async (id) => {
        const sql = "SELECT * FROM categories WHERE id_category = ?";
        const [result] = await db.query(sql, [id]);
        return result[0] || null;
    },
    create: async (name) => {
        const sql = "INSERT INTO categories (name) VALUES (?)";
        const [result] = await db.query(sql, [name]);
        return result;
    },

    update: async (id, name) => {
        const sql = "UPDATE categories SET name = ? WHERE id_category = ?";
        const [result] = await db.query(sql, [name, id]);
        return result;
    },

    delete: async (id) => {
        const sql = "DELETE FROM categories WHERE id_category = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    },
};
