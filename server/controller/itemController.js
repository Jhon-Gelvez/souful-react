import { v4 as uuidv4 } from "uuid";
import { db } from "../config/mysql.js";
import { deleteImage } from "../services/deleteImage.js";

// Obtener todos los items
export const getAllItemsDB = (req, res) => {
    const sql = "SELECT * FROM product_images";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear un item
export const createItemDB = (req, res) => {
    // Generamos el ID aquí mismo
    const id = uuidv4();

    const { name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id } = req.body;

    const sql = `INSERT INTO product_images 
    (id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Pasamos el 'id' generado como primer valor
    const values = [id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Devolvemos el UUID generado para que el frontend sepa cuál es
        res.status(201).json({
            message: "Creado con éxito con UUID",
            id: id,
            data: {
                id,
                name_product,
                alt,
                price,
                image_url,
                public_id,
                file_size,
                mime_type,
                dimensions,
                category_id,
            },
        });
    });
};
// Borrar un item (DB + Cloudinary)
export const deleteItemDB_cdl = (req, res) => {
    const { id } = req.params;

    // 1. Primero buscamos el public_id en la DB para saber qué borrar en Cloudinary
    const sqlSelect = "SELECT public_id FROM tu_tabla WHERE id = ?";

    db.query(sqlSelect, [id], async (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "No encontrado" });

        const publicId = results[0].public_id;

        try {
            // 2. Borrar en Cloudinary
            if (publicId) await deleteImage(publicId);

            // 3. Borrar en MySQL
            const sqlDelete = "DELETE FROM tu_tabla WHERE id = ?";
            db.query(sqlDelete, [id], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Eliminado de la DB y Cloudinary" });
            });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar recursos" });
        }
    });
};

// obtener una img

export const getImage = async (req, res) => {
    const { id } = req.params;
};
