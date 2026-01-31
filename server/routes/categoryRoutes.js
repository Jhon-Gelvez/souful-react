import express from "express";
import * as categoryController from "../controller/categoryController.js";

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
