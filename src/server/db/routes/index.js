import express from "express";
const router = express.Router();

import group from "./group.js";
router.use("/api/groups", group);

import history from "./history.js";
router.use("/api/history", history);

import user from "./user.js";
router.use("/api/users", user);

import me from "./me.js";
router.use("/api/me", me);

export default router;
