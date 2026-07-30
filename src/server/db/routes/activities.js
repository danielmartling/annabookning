import express from "express";
const router = express.Router();

import { getActivities, getActivitiesByCategory, createActivity, updateActivity } from "../controllers/activityController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["guest", "staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    getActivities
);

router.get(
    "/bycategory",
    requireLogin,
    requireRoles(["guest", "staff"]),
    getActivitiesByCategory
)

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-admin", "system-admin"]),
    createActivity
)

router.put(
    "/:id",
    requireRoles(["staff"]),
    requirePermission(["program-admin", "system-admin"]),
    updateActivity
)

export default router;