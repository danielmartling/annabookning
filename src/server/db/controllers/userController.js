// src/server/db/controllers/groupController.js

import { User, Logentry } from "../models/index.js";
import { Op } from "sequelize";

// GET /users
export async function getAllUsers(req, res) {
    const users = await User.findAll({});
    
    res.json(users);
}


