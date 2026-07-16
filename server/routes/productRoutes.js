import express from "express";
import { productController } from "../controllers/productController.js";

const router = express.Router();

router.get("/api/products/", productController.get);
router.get("/api/products/name/:name", productController.getByName);
router.get("/api/products/:id", productController.getById);
router.post("/api/products/", productController.create);
router.patch("/api/products/:id", productController.update);
router.delete("/api/products/:id", productController.delete);

export default router;
