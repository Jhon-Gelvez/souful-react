import { saleModel } from "../models/saleModel.js";
import { dbExport } from "../services/dbExport.js";

export const saleController = {
    get: async (req, res) => {
        try {
            const sales = await saleModel.get();
            res.status(200).json(sales);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const sale = await saleModel.getById(id);
            if (!sale) {
                return res.status(404).json({ message: "Sale not found" });
            }
            res.status(200).json(sale);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        const { id_user, id_record } = req.body;
        if (!id_user || !id_record) {
            return res.status(400).json({ message: "id_user and id_record are required" });
        }
        try {
            const result = await saleModel.create(req.body);
            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ message: "Sale not created" });
            }
            res.status(201).json({
                message: "Sale created successfully",
                saleId: result.insertId,
                ...req.body,
            });
            dbExport();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await saleModel.delete(id);
            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: "Sale not found" });
            }
            res.status(200).json({ message: "Sale deleted successfully", id });
            dbExport();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    getByUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const sales = await saleModel.getByUser(userId);
            res.status(200).json(sales);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    getByProduct: async (req, res) => {
        const { productId } = req.params;
        try {
            const sales = await saleModel.getByProduct(productId);
            res.status(200).json(sales);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};
