import { categoryModel } from "../models/categoryModel.js";
import { dbExport } from "../services/dbExport.js";
import { errorHandler } from "../services/errorHandler.js";

export const categoryController = {
    get: async (req, res) => {
        try {
            const categories = await categoryModel.get();
            res.status(200).json(categories);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await categoryModel.getById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            errorHandler(error, res);
        }
    },
    create: async (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        try {
            const result = await categoryModel.create(name);
            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "Category not created" });
            }
            res.status(201).json({
                message: "Category created successfully",
                categoryId: result.insertId,
                name,
            });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        try {
            const result = await categoryModel.update(id, name);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Category not found or no changes" });
            }
            res.status(200).json({ message: "Category updated successfully", id, name });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await categoryModel.delete(id);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category deleted successfully", id });
            dbExport();
        } catch (error) {
            errorHandler(error, res);
        }
    },
};
