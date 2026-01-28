import express from 'express';
const router = express.Router();

// IMPORTANT: Always include the .js extension for local imports in ES modules
import * as itemController from '../controller/itemController.js';

router.get('/', itemController.getAllItemsDB);
router.post('/', itemController.createItemDB);
router.delete('/:id', itemController.deleteItemDB_cdl);

export default router;