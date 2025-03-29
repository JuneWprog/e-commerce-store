import express from 'express';
import { createCategory, deleteCategory, getAllCategories } from '../controllers/category.controller.js';
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", protectRoute, adminRoute, createCategory);
router.delete("/:id", protectRoute, adminRoute, deleteCategory);

export default router;