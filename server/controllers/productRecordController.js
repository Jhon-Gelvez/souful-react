import { productRecordModel } from "../models/productRecordModel.js";
import { dbExport } from "../services/dbExport.js";
import { buildUpdateData } from "../services/buildUpdateData.js";
import { errorHandler } from "../services/errorHandler.js";

export const productRecordController = {
    get: async (req, res) => {
        try {
            const records = await productRecordModel.get();
            res.status(200).json(records);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const record = await productRecordModel.getById(id);
            if (!record) {
                return res.status(404).json({ message: "Product record not found" });
            }
            res.status(200).json(record);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    create: async (req, res) => {
        const { id_product, id_image, id_category, is_active } = req.body;

        if (!id_product || !id_image || !id_category || !is_active) {
            return res.status(400).json({ message: "All fields are required" });
        }
        try {
            const result = await productRecordModel.create({ id_product, id_image, id_category, is_active });

            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "Product record not created" });
            }
            res.status(201).json({
                message: "Product record created successfully",
                recordId: result.insertId,
                id_product,
                id_image,
                id_category,
                is_active,
            });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        let updateData = buildUpdateData(req.body, ["id_product", "id_image", "id_category", "is_active"]);

        if (updateData.error) {
            return res.status(400).json({ message: updateData.error });
        }

        updateData = updateData.data;

        try {
            const result = await productRecordModel.update(id, updateData);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Product record not found or no changes" });
            }
            res.status(200).json({ message: "Product record updated successfully", id, ...updateData });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await productRecordModel.delete(id);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Product record not found" });
            }
            res.status(200).json({ message: "Product record deleted successfully", id });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByCategory: async (req, res) => {
        const { categoryId } = req.params;
        try {
            const records = await productRecordModel.getByCategory(categoryId);
            if (!records) {
                return res.status(404).json({ message: "Product record not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByProduct: async (req, res) => {
        const { productId } = req.params;
        try {
            const records = await productRecordModel.getByProduct(productId);
            if (!records) {
                return res.status(404).json({ message: "Product record not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByActive: async (req, res) => {
        try {
            const records = await productRecordModel.getByActive();
            if (!records) {
                return res.status(404).json({ message: "Product record not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getByInactive: async (req, res) => {
        try {
            const records = await productRecordModel.getByInactive();
            if (!records) {
                return res.status(404).json({ message: "Product record not found" });
            }
            res.status(200).json(records);
        } catch (error) {
            errorHandler(error, res);
        }
    },
};
