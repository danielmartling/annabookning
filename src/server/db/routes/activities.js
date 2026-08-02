import express from "express";
const router = express.Router();

import { getActivities, getActivity, getActivitiesByCategory, createActivity, updateActivity } from "../controllers/activityController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["guest", "staff"]), 
    getActivities
);

router.get(
    "/bycategory",
    requireLogin,
    requireRoles(["guest", "staff"]),
    getActivitiesByCategory
)


router.get(
    "/:id", 
    requireLogin, 
    requireRoles(["guest", "staff"]), 
    getActivity
);
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