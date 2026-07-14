import { db } from "../config/mysql.js";

export const saleModel = {
    get: async () => {
        const sql = `
            SELECT s.*, u.first_name, u.last_name, u.email,
                   pr.id_record, p.name AS product_name, p.price, i.image_url
            FROM sales s
            JOIN users u ON s.id_user = u.id_user
            JOIN product_records pr ON s.id_record = pr.id_record
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
        `;
        const [result] = await db.query(sql);
        return result;
    },
    getById: async (id) => {
        const sql = `
            SELECT s.*, u.first_name, u.last_name, u.email,
                   pr.id_record, p.name AS product_name, p.price, i.image_url
            FROM sales s
            JOIN users u ON s.id_user = u.id_user
            JOIN product_records pr ON s.id_record = pr.id_record
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            WHERE s.id_sale = ?
        `;
        const [result] = await db.query(sql, [id]);
        return result[0] || null;
    },
    create: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => "?").join(", ");
        const sql = `INSERT INTO sales (${fields.join(", ")}) VALUES (${placeholders})`;
        const [result] = await db.query(sql, values);
        return result;
    },
    delete: async (id) => {
        const sql = "DELETE FROM sales WHERE id_sale = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    },
    getByUser: async (userId) => {
        const sql = `
            SELECT s.*, p.name AS product_name, p.price, i.image_url
            FROM sales s
            JOIN product_records pr ON s.id_record = pr.id_record
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            WHERE s.id_user = ?
        `;
        const [result] = await db.query(sql, [userId]);
        return result;
    },
    getByProduct: async (productId) => {
        const sql = `
            SELECT s.*, p.name AS product_name, p.price, i.image_url
            FROM sales s
            JOIN product_records pr ON s.id_record = pr.id_record
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            WHERE pr.id_record = ?
        `;
        const [result] = await db.query(sql, [userId]);
        return result;
    },
};
