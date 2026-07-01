import express from "express";
import multer from "multer";
import path from "path";
import {
  getDrinks, getDrinkById, getAllDrinksAdmin,
  createDrink, updateDrink, deleteDrink
} from "../controllers/drinkController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Public
router.get("/", getDrinks);
router.get("/:id", getDrinkById);

// Admin CMS
router.get("/admin/all", protect, adminOnly, getAllDrinksAdmin);
router.post("/", protect, adminOnly, upload.single("image"), createDrink);
router.put("/:id", protect, adminOnly, upload.single("image"), updateDrink);
router.delete("/:id", protect, adminOnly, deleteDrink);

export default router;
