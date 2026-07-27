// src/server/db/controllers/activitycategoryController.js

import { ActivityCategory, History } from "../models/index.js";
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


// POST /categories
export async function createCategory(req, res) {
    const category = await ActivityCategory.create(req.body);
    res.json(category);

    const history = await History.create({ table_name: "category", record_id: category.category_id, action: "create", user_id: req.session.user.id });
}

// PUT /categories/:id
export async function updateCategory(req, res) {
    try {

        const {
            name,
            desc,
            color,
            active,
            order
        } = req.body;


        const category = await ActivityCategory.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }


        await category.update({
            name,
            desc,
            color,
            active,
            order
        });

        const logentry = await History.create({ table_name: "category", record_id: category.category_id, action: "change", changes: "", user_id: req.session.user.id });

        return res.status(200).json({
            message: "Category updated successfully",
            category: {
                category_id: category.category_id,
                name: category.name,
                order: category.order,
                color: category.color,
                active: category.active
            }
        });

    } catch (error) {
        console.error("Update category error:", error);

        return res.status(500).json({
            message: "Failed to update category",
            error: error.message
        });
    }
}