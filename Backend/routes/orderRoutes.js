import express from "express";
import { createOrder, getOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", createOrder);
router.get("/", protect, adminOnly, getOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, adminOnly, deleteOrder);
export default router;
