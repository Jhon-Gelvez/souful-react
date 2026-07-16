import { productModel } from "../models/productModel.js";
import { dbExport } from "../services/dbExport.js";
import { buildUpdateData } from "../services/buildUpdateData.js";

export const productController = {
    get: async (req, res) => {
        try {
            const products = await productModel.get();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await productModel.getById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }
        try {
            const result = await productModel.create({ name, price });
            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "Product not created" });
            }
            res.status(201).json({
                message: "Product created successfully",
                productId: result.insertId,
                name,
                price,
            });
            dbExport();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        let updateData = buildUpdateData(req.body, ["name", "price"]);

        if (updateData.error) {
            return res.status(400).json({ message: updateData.error });
        }

        updateData = updateData.data;

        try {
            const result = await productModel.update(id, updateData);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Product not found or no changes" });
            }
            res.status(201).json({ message: "Product updated successfully", id, ...updateData });
            dbExport();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await productModel.delete(id);

            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully", id });
            dbExport();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    getByName: async (req, res) => {
        const { name } = req.params;
        try {
            const product = await productModel.getByName(name);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};
