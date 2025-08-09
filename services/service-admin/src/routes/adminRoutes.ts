import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import * as adminController from "../controllers/adminController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Public routes
router.post("/register", upload.single("profilePic"), adminController.register);
router.post("/login", adminController.login);

// Protected routes
router.get("/profile", authenticateToken, authorizeRoles("admin", "superadmin"), adminController.getProfile);
router.get("/", authenticateToken, authorizeRoles("superadmin"), adminController.getAllAdmins);
router.put("/:id", authenticateToken, authorizeRoles("admin", "superadmin"), upload.single("profilePic"), adminController.updateAdmin);
router.delete("/:id", authenticateToken, authorizeRoles("superadmin"), adminController.deleteAdmin);

export default router;
