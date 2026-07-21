import express from "express";
const router = express.Router();

import { getAllGroups, getGroupsByDay, createGroup } from "../controllers/groupController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get("/", requireLogin, requireRoles(["staff"]), getAllGroups);
router.get("/byday/:day", requireLogin, requireRoles(["staff"]), getGroupsByDay);
router.post("/", requireLogin, requireRoles(["staff"]), requirePermission(["program-booker", "program-admin", "system-admin"]), createGroup)

export default router;