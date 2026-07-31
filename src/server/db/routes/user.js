import express from "express";
const router = express.Router();

import * as user from "../controllers/userController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/", 
    requireLogin, 
    requireRoles(["staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    user.getAllUsers
);

router.get(
    "/:id", 
    requireLogin, 
    requireRoles(["staff"]), 
    requirePermission(["program-viewer", "program-jour", "program-booker", "program-admin", "system-admin"]), 
    user.getUser
);

router.post(
    "/",
    requireLogin,
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    user.createUser
)

router.put(
    "/info/:id",
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    user.updateUserInfo
)

router.put(
    "/password/:id",
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    user.updateUserPassword
)

router.put(
    "/roles/:id",
    requireRoles(["staff"]),
    requirePermission(["program-booker", "program-admin", "system-admin"]),
    user.updateUserRoles
)


export default router;