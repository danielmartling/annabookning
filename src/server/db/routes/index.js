import express from "express";
const router = express.Router();

import groupRouter from "./group.js";
router.use("/api/groups", groupRouter);

import historyRouter from "./history.js";
router.use("/api/history", historyRouter);

import userRouter from "./user.js";
router.use("/api/users", userRouter);

export default router;
