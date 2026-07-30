// src/server/db/controllers/activityController.js

import { Activity, ActivityCategory, ActivityTag, History } from "../models/index.js";
import { Op } from "sequelize";


// GET /activities
export async function getActivities(req, res) {
    const activities = await Activity.findAll({
    });

    res.json(activities);
}

// GET /activities/bycategory
export async function getActivitiesByCategory(req, res) {
    const activities = await ActivityCategory.findAll({
        order: [
            ['order', 'ASC'],
        ],
        include: [
            {
                model: Activity,
                as: "activities",
                order: [
                    ['order', 'ASC'],
                ],
                include: [
                    {
                        model: ActivityCategory,
                        as: "category",
                    },
                    {
                        model: ActivityTag,
                        as: "tag",
                    }
                ]
            }
        ],
    });

    res.json(activities);
}


// POST /activities
export async function createActivity(req, res) {
    const {
        title,
        category_id,
        tag_id
    } = req.body;
    
    const activity = await Activity.create({
        title: title,
        category_id: category_id,
        tag_id: tag_id
    });
    res.json(activity);

    const history = await History.create({ table_name: "activities", record_id: activity.activity_id, action: "create", user_id: req.session.user.id });
}

// PUT /activities/:id
export async function updateActivity(req, res) {
    try {

        const payload = req.body;
        const activity = await Activity.findByPk(req.params.id);

        if (!activity) {
            return res.status(404).json({
                message: "Activity not found"
            });
        }

        await activity.update(payload);

        const logentry = await History.create({ table_name: "activities", record_id: activity.activity_id, action: "change", changes: "", user_id: req.session.user.id });

        return res.status(200).json({
            message: "Activity updated successfully",
            activity: activity
        });

    } catch (error) {
        console.error("Update activity error:", error);

        return res.status(500).json({
            message: "Failed to update activity",
            error: error.message
        });
    }
}