import express from "express";
import { productRecordController } from "../controllers/productRecordController.js";

const router = express.Router();

router.get("/api/product-records/", productRecordController.get);
router.get("/api/product-records/active", productRecordController.getByActive);
router.get("/api/product-records/inactive", productRecordController.getByInactive);
router.get("/api/product-records/category/:categoryId", productRecordController.getByCategory);
router.get("/api/product-records/product/:productId", productRecordController.getByProduct);
router.get("/api/product-records/:id", productRecordController.getById);
router.post("/api/product-records/", productRecordController.create);
router.patch("/api/product-records/:id", productRecordController.update);
router.delete("/api/product-records/:id", productRecordController.delete);

export default router;
