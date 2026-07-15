import { db } from "../config/mysql.js";

export const userModel = {
    get: async () => {
        const sql = "SELECT * FROM users";
        const [result] = await db.query(sql);
        return result;
    },
    getById: async (id) => {
        const sql = "SELECT * FROM users WHERE id_user = ?";
        const [result] = await db.query(sql, [id]);
        return result[0] || null;
    },
    create: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => "?").join(", ");
        const sql = `INSERT INTO users (${fields.join(", ")}) VALUES (${placeholders})`;
        const [result] = await db.query(sql, values);
        return result;
    },
    update: async (id, data) => {
        const fields = Object.keys(data);
        if (fields.length === 0) return null;
        const setQuery = fields.map((f) => `${f} = ?`).join(", ");
        const values = [...Object.values(data), id];
        const sql = `UPDATE users SET ${setQuery} WHERE id_user = ?`;
        const [result] = await db.query(sql, values);
        return result;
    },
    delete: async (id) => {
        const sql = "DELETE FROM users WHERE id_user = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    },
    getByName: async (name) => {
        const sql = "SELECT * FROM users WHERE first_name = ?";
        const [result] = await db.query(sql, [name]);
        return result[0] || null;
    },
    getByEmail: async (email) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [result] = await db.query(sql, [email]);
        return result[0] || null;
    },
};
