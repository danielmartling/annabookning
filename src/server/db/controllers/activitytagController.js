// src/server/db/controllers/activitytagController.js

import { ActivityTag, History } from "../models/index.js";
import { Op } from "sequelize";


// GET /tags
export async function getTags(req, res) {
    const tags = await ActivityTag.findAll({
        order: [
            ['name', 'ASC'],
        ],
    });

    res.json(tags);
}


// POST /tags
export async function createTag(req, res) {
    const tag = await ActivityTag.create(req.body);
    res.json(tag);

    const history = await History.create({ table_name: "tags", record_id: tag.tag_id, action: "create", user_id: req.session.user.id });
}

// PUT /tags/:id
export async function updateTag(req, res) {
    try {

        const {
            name,
            desc,
            color,
            active,
        } = req.body;


        const tag = await ActivityTag.findByPk(req.params.id);

        if (!tag) {
            return res.status(404).json({
                message: "Tag not found"
            });
        }


        await tag.update({
            name,
            desc,
            color,
            active,
        });

        const logentry = await History.create({ table_name: "tags", record_id: tag.tag_id, action: "change", changes: "", user_id: req.session.user.id });

        return res.status(200).json({
            message: "Tag updated successfully",
            tag: {
                tag_id: tag.tag_id,
                name: tag.name,
                color: tag.color,
                active: tag.active
            }
        });

    } catch (error) {
        console.error("Update tag error:", error);

        return res.status(500).json({
            message: "Failed to update tag",
            error: error.message
        });
    }
}