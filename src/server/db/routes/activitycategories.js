import express from "express";
const router = express.Router();

import { getCategories } from "../controllers/activitycategoryController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    getCategories
);

export default router;