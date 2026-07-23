import express from "express";
const router = express.Router();

import { getMe } from "../controllers/meController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get("/", requireLogin, requireRoles(["staff", "guest"]), getMe);

export default router;