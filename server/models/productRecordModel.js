import { db } from "../config/mysql.js";

export const productRecordModel = {
    get: async () => {
        const sql = `
            SELECT pr.*, p.name AS product_name, p.price, i.image_url, i.public_id, i.alt, c.name AS category_name
            FROM product_records pr
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            LEFT JOIN categories c ON pr.id_category = c.id_category
        `;
        const [result] = await db.query(sql);
        return result;
    },
    getById: async (id) => {
        const sql = `
            SELECT pr.*, p.name AS product_name, p.price, i.image_url, i.public_id, i.alt, c.name AS category_name
            FROM product_records pr
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            LEFT JOIN categories c ON pr.id_category = c.id_category
            WHERE pr.id_record = ?
        `;
        const [result] = await db.query(sql, [id]);
        return result[0] || null;
    },
    create: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map(() => "?").join(", ");
        const sql = `INSERT INTO product_records (${fields.join(", ")}) VALUES (${placeholders})`;
        const [result] = await db.query(sql, values);
        return result;
    },
    update: async (id, data) => {
        const fields = Object.keys(data);
        if (fields.length === 0) return null;
        const setQuery = fields.map((f) => `${f} = ?`).join(", ");
        const values = [...Object.values(data), id];
        const sql = `UPDATE product_records SET ${setQuery} WHERE id_record = ?`;
        const [result] = await db.query(sql, values);
        return result;
    },
    delete: async (id) => {
        const sql = "DELETE FROM product_records WHERE id_record = ?";
        const [result] = await db.query(sql, [id]);
        return result;
    },
    getByCategory: async (categoryId) => {
        const sql = `
            SELECT pr.*, p.name AS product_name, p.price, i.image_url, i.public_id, i.alt, c.name AS category_name
            FROM product_records pr
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            LEFT JOIN categories c ON pr.id_category = c.id_category
            WHERE pr.id_category = ?
        `;
        const [result] = await db.query(sql, [categoryId]);
        return result;
    },
    getByProduct: async (productId) => {
        const sql = `
            SELECT pr.*, p.name AS product_name, p.price, i.image_url, i.public_id, i.alt, c.name AS category_name
            FROM product_records pr
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            LEFT JOIN categories c ON pr.id_category = c.id_category
            WHERE pr.id_product = ?
        `;
        const [result] = await db.query(sql, [productId]);
        return result;
    },
    getByActive: async () => {
        const sql = `
            SELECT pr.*, p.name AS product_name, p.price, i.image_url, i.public_id, i.alt, c.name AS category_name
            FROM product_records pr
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            LEFT JOIN categories c ON pr.id_category = c.id_category
            WHERE pr.is_active = 1
        `;
        const [result] = await db.query(sql);
        return result;
    },
    getByInactive: async () => {
        const sql = `
            SELECT pr.*, p.name AS product_name, p.price, i.image_url, i.public_id, i.alt, c.name AS category_name
            FROM product_records pr
            JOIN products p ON pr.id_product = p.id_product
            JOIN images i ON pr.id_image = i.id_image
            LEFT JOIN categories c ON pr.id_category = c.id_category
            WHERE pr.is_active = 0
        `;
        const [result] = await db.query(sql);
        return result;
    },
};
