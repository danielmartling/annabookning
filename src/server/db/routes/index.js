import express from "express";
const router = express.Router();

import groupRouter from "./group.js";
router.use("/api/groups", groupRouter);

import logRouter from "./logentry.js";
router.use("/api/history", logRouter);

import userRouter from "./user.js";
router.use("/api/users", userRouter);

export default router;
