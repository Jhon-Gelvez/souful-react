import { v4 as uuidv4 } from "uuid";
import { deleteImage } from "../services/deleteImage.js";
import { itemModel } from "../db/itemModel.js";

export const getItem = async (req, res) => {
    const { public_id } = req.params;

    try {
        const result = await itemModel.getItem(public_id);
        res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
};

export const getAllItemsDB = async (req, res) => {
    try {
        const result = await itemModel.getAllItemsDB();

        return res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const createItemDB = async (req, res) => {
    // Generamos el ID aquí mismo
    const id = uuidv4();

    // le tenemos que pasar el id

    const { name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id } = req.body;

    try {
        const result = await itemModel.createItemDB(id, name_product, alt, price, image_url, public_id, file_size, mime_type, dimensions, category_id);
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
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteItemDB_cdl = async (req, res) => {
    const { public_id } = req.params;

    try {
        const result = await itemModel.deleteItemDB_cdl(public_id);

        if (result.length === 0) {
            return res.status(404).json({ error: "Item no encontrado" });
        }

        if (public_id) {
            const response_cld = await deleteImage(public_id);
        }

        return res.json({ message: "Eliminado con éxito de DB y Cloudinary", item: result, item_cld: response_cld });
    } catch (error) {
        return res.status(500).json({ error: "Error interno al eliminar el recurso" });
    }
};
