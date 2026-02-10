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
    const id = uuidv4();

    // Combinamos el ID con los datos que vienen del body
    const newItem = { id, ...req.body };

    try {
        // Pasamos el objeto completo
        const result = await itemModel.createItemDB(newItem);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Item no creado" });
        }

        res.status(201).json({
            message: "Creado con éxito con UUID",
            data: newItem, // Ya contiene el id y todos los campos
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateItemDB = async (req, res) => {
    const { public_id } = req.params;
    const data = req.body;

    try {
        const result = await itemModel.updateItemDB(public_id, data);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado o sin cambios" });
        }

        res.json({
            message: "Producto actualizado correctamente",
            updatedFields: Object.keys(updateData),
        });
    } catch (error) {
        return res.status(500).json({ error: "Error interno al eliminar el recurso" });
    }
};

export const deleteItemDB_cdl = async (req, res) => {
    const { public_id } = req.params;

    try {
        const result = await itemModel.deleteItemDB_cdl(public_id);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const response_cld = await deleteImage(public_id);

        return res.json({
            message: "Eliminado con éxito de DB y Cloudinary",
            item: result,
            item_cld: response_cld,
        });
    } catch (error) {
        return res.status(500).json({ error: "Error interno al eliminar el recurso" });
    }
};
