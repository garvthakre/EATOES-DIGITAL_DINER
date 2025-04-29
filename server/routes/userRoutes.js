import express from "express";
import { 
  getUserById, 
  updateUser, 
  getAllUsers 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);

// Admin route (would typically have additional admin middleware)
router.get("/", protect, getAllUsers);

export default router;