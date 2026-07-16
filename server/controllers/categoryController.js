import { categoryModel } from "../models/categoryModel.js";
import { dbExport } from "../services/dbExport.js";

export const categoryController = {
    get: async (req, res) => {
        try {
            const categories = await categoryModel.get();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
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
            console.error(error);
            res.status(500).json({ error: error.message });
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
            console.error(error);
            res.status(500).json({ error: error.message });
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
            console.error(error);
            res.status(500).json({ error: error.message });
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
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};
