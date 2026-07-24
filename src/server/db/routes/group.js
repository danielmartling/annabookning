import express from "express";
const router = express.Router();

import { getAllGroups, getGroupsByDay, createGroup, getGroupsOnIsland, getGroup, updateGroup, updateGroupNotes } from "../controllers/groupController.js";
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

router.get(
    "/:id",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getGroup
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    createGroup
)

router.put(
    "/:id",
    requireRoles(["staff"]),
    requirePermission(["program-jour", "program-booker", "program-admin", "system-admin"]),
    updateGroup
)

router.put(
    "/notes/:id",
    requireRoles(["staff"]),
    requirePermission(["program-jour", "program-booker", "program-admin", "system-admin"]),
    updateGroupNotes
)

export default router;