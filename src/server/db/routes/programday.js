import express from "express";
const router = express.Router();

import { getProgramDay, updateProgramDay } from "../controllers/programdayController.js";
import { requireLogin, requireRoles, requirePermission } from "../../middleware/auth.js";

router.get(
    "/:day", 
    requireLogin, 
    requireRoles(["staff"]),
    getProgramDay
);

router.put(
    "/:day",
    requireRoles(["staff"]),
    requirePermission(["program-jour", "program-booker", "program-admin", "system-admin"]),
    updateProgramDay
)



export default router;