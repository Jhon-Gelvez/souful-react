import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/users/", userController.get);
router.get("/api/users/email/:email", userController.getByEmail);
router.get("/api/users/name/:name", userController.getByName);
router.get("/api/users/:id", userController.getById);
router.post("/api/users/", userController.create);
router.patch("/api/users/:id", userController.update);
router.delete("/api/users/:id", userController.delete);

export default router;
