import express from "express";
import { imageController } from "../controllers/imageController.js";

const router = express.Router();

router.get("/api/images/", imageController.get);
router.get("/api/images/public/:publicId", imageController.getByPublicId);
router.get("/api/images/:id", imageController.getById);
router.post("/api/images/", imageController.create);
router.patch("/api/images/:id", imageController.update);
router.delete("/api/images/:id", imageController.delete);

export default router;
