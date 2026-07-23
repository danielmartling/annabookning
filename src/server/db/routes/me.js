import express from "express";
const router = express.Router();

import { getMe, updateMyInfo, updateMyPassword } from "../controllers/meController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get("/", requireLogin, requireRoles(["staff", "guest"]), getMe);
router.put("/info", requireLogin, requireRoles(["staff", "guest"]), updateMyInfo);
router.put("/password", requireLogin, requireRoles(["staff", "guest"]), updateMyPassword);

export default router;