import { db } from "../config/mysql.js";

export const productModel = {
    get: async () => {
        const sql = "SELECT * FROM products";
        const [result] = await db.query(sql);
        return result;
    },

    getById: async (id) => {
        const sql = "SELECT * FROM products WHERE id_product = ?";
        const [result] = await db.query(sql, [id]);
        return result[0] || null;
    },

    create: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => "?").join(", ");
        const sql = `INSERT INTO products (${fields.join(", ")}) VALUES (${placeholders})`;
        const [result] = await db.query(sql, values);
        return result;
    },

    update: async (id, data) => {
        const fields = Object.keys(data);
        if (fields.length === 0) return null;
        const setQuery = fields.map((f) => `${f} = ?`).join(", ");
        const values = [...Object.values(data), id];
        const sql = `UPDATE products SET ${setQuery} WHERE id_product = ?`;
        const [result] = await db.query(sql, values);
        return result;
    },

    delete: async (id) => {
        const sql = "DELETE FROM products WHERE id_product = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    },
    getByName: async (name) => {
        const sql = "SELECT * FROM products WHERE name = ?";
        const [result] = await db.query(sql, [name]);
        return result[0] || null;
    },
};
