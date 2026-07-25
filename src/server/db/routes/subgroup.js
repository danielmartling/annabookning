import express from "express";
const router = express.Router();

import { createSubgroup, createDefaultSubgroup, createDefaultScoutgroup } from "../controllers/subgroupController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-jour", "program-booker", "program-admin", "system-admin"]),
    createSubgroup
)

router.post(
    "/default",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-jour", "program-booker", "program-admin", "system-admin"]),
    createDefaultSubgroup
)

router.post(
    "/default/scoutgroup",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-jour", "program-booker", "program-admin", "system-admin"]),
    createDefaultScoutgroup
)

export default router;