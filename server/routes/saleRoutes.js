import express from "express";
import { saleController } from "../controllers/saleController.js";

const router = express.Router();

router.get("/api/sales/", saleController.get);
router.get("/api/sales/user/:userId", saleController.getByUser);
router.get("/api/sales/product/:productId", saleController.getByProduct);
router.get("/api/sales/:id", saleController.getById);
router.post("/api/sales/", saleController.create);
router.delete("/api/sales/:id", saleController.delete);

export default router;
