import express from "express";
import { 
  createOrder, 
  getOrdersByPhone, 
  getOrderById,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new order (public route)
router.post("/", createOrder);

// Get orders by phone number (no auth required for simplicity in this prototype)
router.get("/phone/:phone", getOrdersByPhone);

// Get specific order details (no auth for simplicity)
router.get("/:id", getOrderById);

// Update order status (protected, would typically have admin check in real app)
router.put("/:id/status", protect, updateOrderStatus);

export default router;