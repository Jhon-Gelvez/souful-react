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
    createItemDB: async (id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id) => {
        const sql = `INSERT INTO product_images 
    (id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id];
        const [result] = await db.query(sql, values);
        return result;
    },
    deleteItemDB_cdl: async (public_id) => {
        const sql = "DELETE FROM product_images WHERE public_id = ?";

        const [result] = await db.query(sql, [public_id]);

        return result
    },
};
