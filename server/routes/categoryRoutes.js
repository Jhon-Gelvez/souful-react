import express from "express";
import { categoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/api/categories/", categoryController.get);
router.get("/api/categories/:id", categoryController.getById);
router.post("/api/categories/", categoryController.create);
router.patch("/api/categories/:id", categoryController.update);
router.delete("/api/categories/:id", categoryController.delete);

export default router;
