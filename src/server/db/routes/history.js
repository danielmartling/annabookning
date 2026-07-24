import express from "express";
const router = express.Router();

import { getHistory, getHistoryOfUser, getRecentHistoryOfUser, getHistoryOfGroup, getRecentHistoryOfGroup, log } from "../controllers/historyController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getHistory
)

router.get(
    "/user/:id",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getHistoryOfUser
)

router.get(
    "/user/recent/:id",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getRecentHistoryOfUser
);

router.get(
    "/group/:id",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getHistoryOfGroup
)

router.get(
    "/group/recent/:id",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]),
    getRecentHistoryOfGroup
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff", "guest"]),
    log
);

export default router;