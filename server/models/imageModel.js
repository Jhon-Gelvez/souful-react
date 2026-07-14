import { db } from "../config/mysql.js";

export const imageModel = {
    get: async () => {
        const sql = "SELECT * FROM images";
        const [result] = await db.query(sql);
        return result;
    },
    getById: async (id) => {
        const sql = "SELECT * FROM images WHERE id_image = ?";
        const [result] = await db.query(sql, [id]);
        return result[0] || null;
    },
    create: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => "?").join(", ");
        const sql = `INSERT INTO images (${fields.join(", ")}) VALUES (${placeholders})`;
        const [result] = await db.query(sql, values);
        return result;
    },
    update: async (id, data) => {
        const fields = Object.keys(data);
        if (fields.length === 0) return null;
        const setQuery = fields.map((f) => `${f} = ?`).join(", ");
        const values = [...Object.values(data), id];
        const sql = `UPDATE images SET ${setQuery} WHERE id_image = ?`;
        const [result] = await db.query(sql, values);
        return result;
    },

    delete: async (id) => {
        const sql = "DELETE FROM images WHERE id_image = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    },

    getByPublicId: async (publicId) => {
        const sql = "SELECT * FROM images WHERE public_id = ?";
        const [result] = await db.query(sql, [publicId]);
        return result[0] || null;
    },
};
