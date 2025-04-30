import express from "express";
import { 
  createOrder, 
  getOrdersByPhone, 
  getOrderById,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

 
router.post("/", createOrder);

 
router.get("/phone/:phone", getOrdersByPhone);
 
router.get("/:id", getOrderById);

 
router.put("/:id/status", protect, updateOrderStatus);

export default router;