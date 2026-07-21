import express from "express";
const router = express.Router();

import { getAllUsers } from "../controllers/userController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get("/", requireLogin, requireRoles(["staff"]), getAllUsers);

export default router;