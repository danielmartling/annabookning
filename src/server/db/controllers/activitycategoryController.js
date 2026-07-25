// src/server/db/controllers/activitycategoryController.js

import { ActivityCategory } from "../models/index.js";
import { Op } from "sequelize";


// GET /categories
export async function getCategories(req, res) {
    const categories = await ActivityCategory.findAll({
        order: [
            ['order', 'ASC'],
        ],
    });

    res.json(categories);
}
