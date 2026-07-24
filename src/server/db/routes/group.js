import express from "express";
const router = express.Router();

import { getAllGroups, getGroupsByDay, createGroup, getGroupsOnIsland } from "../controllers/groupController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getAllGroups
);

router.get(
    "/island",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getGroupsOnIsland
);

router.get(
    "/byday/:day",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getGroupsByDay
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    createGroup
)

export default router;