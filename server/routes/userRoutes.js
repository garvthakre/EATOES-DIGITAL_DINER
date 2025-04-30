import express from "express";
import { 
  getUserById, 
  updateUser, 
  getAllUsers 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
 
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);

 
router.get("/", protect, getAllUsers);

export default router;