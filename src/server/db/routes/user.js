import express from "express";
const router = express.Router();

import { getAllUsers, getUser, createUser } from "../controllers/userController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    getAllUsers
);

router.get(
    "/:id", 
    requireLogin, 
    requireRoles(["staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    getUser
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    createUser
)

export default router;