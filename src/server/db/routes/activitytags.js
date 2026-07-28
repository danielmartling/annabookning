import express from "express";
const router = express.Router();

import { getTags, createTag, updateTag } from "../controllers/activitytagController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    getTags
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-admin", "system-admin"]),
    createTag
)

router.put(
    "/:id",
    requireRoles(["staff"]),
    requirePermission(["program-admin", "system-admin"]),
    updateTag
)

export default router;