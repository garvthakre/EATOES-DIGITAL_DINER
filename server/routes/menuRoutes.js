import express from "express";
import { 
  getAllMenuItems, 
  getMenuCategories, 
  getMenuItemsByCategory, 
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes for menu access
router.get("/", getAllMenuItems);
router.get("/categories", getMenuCategories);
router.get("/category/:id", getMenuItemsByCategory);
router.get("/item/:id", getMenuItemById);

// Protected routes for admin menu management
// In a real application, these would have additional admin middleware
router.post("/", protect, createMenuItem);
router.put("/item/:id", protect, updateMenuItem);
router.delete("/item/:id", protect, deleteMenuItem);

export default router;