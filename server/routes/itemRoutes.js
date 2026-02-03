import express from "express";
import * as itemController from "../controller/itemController.js";

const router = express.Router();

router.get("/:public_id", itemController.getItem)
router.get("/", itemController.getAllItemsDB);
router.patch("/:id", itemController.updateItemDB);
router.post("/", itemController.createItemDB);
router.delete("/:public_id", itemController.deleteItemDB_cdl);

export default router;
