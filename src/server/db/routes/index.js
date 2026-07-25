import express from "express";
const router = express.Router();

import group from "./group.js";
router.use("/api/groups", group);

import subgroup from "./subgroup.js";
router.use("/api/subgroups", subgroup);

import history from "./history.js";
router.use("/api/history", history);

import user from "./user.js";
router.use("/api/users", user);

import me from "./me.js";
router.use("/api/me", me);

import programday from "./programday.js";
router.use("/api/programday", programday);

import categories from "./activitycategories.js";
router.use("/api/categories", categories);

export default router;
