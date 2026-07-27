import express from "express";
const router = express.Router();

import { getCategories, createCategory, updateCategory } from "../controllers/activitycategoryController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["guest", "staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    getCategories
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-admin", "system-admin"]),
    createCategory
)

router.put(
    "/:id",
    requireRoles(["staff"]),
    requirePermission(["program-admin", "system-admin"]),
    updateCategory
)

export default router;