import { v4 as uuidv4 } from "uuid";
import { db } from "../config/mysql.js";
import { deleteImage } from "../services/deleteImage.js";

// Obtener todos los items
export const getAllItemsDB = async (req, res) => {
    const sql = "SELECT * FROM product_images";

    try {
        // En promesas, db.query devuelve un array: [filas, campos]
        const [rows] = await db.query(sql);

        // Si lo llamas desde una ruta de Express (con req y res)
        if (res) {
            return res.json(rows);
        }

        // Si solo lo estás probando por consola
        console.log("Resultados:", rows);
    } catch (err) {
        console.error("Error en la consulta:", err.message);
        if (res) {
            return res.status(500).json({ error: err.message });
        }
    }
};

// Crear un item
export const createItemDB = async (req, res) => {
    // Generamos el ID aquí mismo
    const id = uuidv4();

    const { name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id } = req.body;

    const sql = `INSERT INTO product_images 
    (id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Pasamos el 'id' generado como primer valor
    const values = [id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id];

    try {
        const result = await db.query(sql, values);
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
        console.log("peticion hecha");
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteItemDB_cdl = async (req, res) => {
    const { public_id } = req.params;

    try {
        // 1. Buscar el public_id. 
        const [rows] = await db.query("SELECT public_id FROM product_images WHERE public_id = ?", [public_id]);
        // Verificar si el item existe antes de seguir
        if (rows.length === 0) {
            return res.status(404).json({ error: "Item no encontrado" });
        }

        const publicId = rows[0].public_id;

        // 2. Borrar en Cloudinary (si existe el publicId)
        if (publicId) {
            await deleteImage(publicId);
        }

        // 3. Borrar en MySQL usando await (sin callbacks internos)
        const sqlDelete = "DELETE FROM product_images WHERE public_id = ?";
        await db.query(sqlDelete, [public_id]);

        return res.json({ message: "Eliminado con éxito de DB y Cloudinary", item : rows });

    } catch (error) {
        console.error("Error en el proceso de borrado:", error);
        return res.status(500).json({ error: "Error interno al eliminar el recurso" });
    }
};

// obtener una img

export const getImage = async (req, res) => {
    const { id } = req.params;
};
