// src/server/db/controllers/meController.js

import { User, History } from "../models/index.js";
import { Op } from "sequelize";

// GET /me
export async function getMe(req, res) {
    const user = await User.findByPk(req.session.user.id);
    res.json(user);
}