// src/server/db/controllers/activityController.js

import { Activity, ActivityCategory, ActivityTag, History } from "../models/index.js";
import { Op } from "sequelize";


// GET /activities
export async function getActivities(req, res) {
    const activities = await Activity.findAll({
    });

    res.json(activities);
}

// GET /activities/:id
export async function getActivity(req, res) {
    try {
        const activity = await Activity.findByPk(req.params.id, {
            include: [
                {
                    model: ActivityCategory,
                    as: "category"
                },
                {
                    model: ActivityTag,
                    as: "tag"
                },
            ]
        });
        return res.json(activity);
    } catch (err) {
        console.error("Get activity error:", err);

        return res.status(404).json({
            message: "Failed to get activity",
            error: err.message
        });
    }
}

// GET /activities/bycategory
export async function getActivitiesByCategory(req, res) {
    const activities = await ActivityCategory.findAll({
        include: [
            {
                model: Activity,
                as: "activities",
                include: [
                    {
                        model: ActivityTag,
                        as: "tag",
                    }
                ]
            }
        ],
        order: [
            ['order', 'ASC'],
            [{ model: Activity, as: 'activities' }, 'order', 'ASC']
        ],
    });

    res.json(activities);
}


// POST /activities
export async function createActivity(req, res) {
    const {
        title,
        subtitle,
        category_id,
        tag_id,
        order
    } = req.body;

    const activity = await Activity.create({
        title,
        subtitle,
        category_id,
        tag_id,
        order
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

// PUT /activities/geometry/:id
export async function updateActivityGeometry(req, res) {
    try {

        const {lng, lat} = req.body;
        const activity = await Activity.findByPk(req.params.id);

        if (!activity) {
            return res.status(404).json({
                message: "Activity not found"
            });
        }

        const point = { 
            type: 'Point', 
            coordinates: [lng, lat]
        };
        await activity.update({geometry: point});

        const logentry = await History.create({ table_name: "activities", record_id: activity.activity_id, action: "change", changes: "geometry", user_id: req.session.user.id });

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

// PUT /activities/about/:id
export async function updateActivityAbout(req, res) {
    try {

        const payload = req.body;
        const id = req.params.id;
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({
                message: "Activity not found"
            });
        }
        await activity.update(payload);

        const logentry = await History.create({ table_name: "activities", record_id: id, action: "change", changes: "about", user_id: req.session.user.id });

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
