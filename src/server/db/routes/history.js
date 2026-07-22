import express from "express";
const router = express.Router();

import { getHistoryOfUser, getHistoryOfGroup, log } from "../controllers/historyController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get("/user/:id", requireLogin, requireRoles(["staff"]), getHistoryOfUser);
router.get("/group/:id", requireLogin, requireRoles(["staff"]), getHistoryOfGroup);
router.post("/", requireLogin, requireRoles(["staff"]), log);

export default router;