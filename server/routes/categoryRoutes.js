import express from "express";
import * as categoryController from "../controller/categoryController";

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post("/:name",categoryController.addCategory);

export default router