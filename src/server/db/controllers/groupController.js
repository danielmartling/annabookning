// src/server/db/controllers/groupController.js

import { Group, Subgroup, History } from "../models/index.js";
import { Op } from "sequelize";

// GET /groups
export async function getAllGroups(req, res) {
    const groups = await Group.findAll({
        include: [
            {
                model: Subgroup,
                as: "subgroups"
            }
        ],
        order: [
            ['arrival_date', 'ASC']
        ],
    });

    res.json(groups);
}

// GET /groups/island
export async function getGroupsOnIsland(req, res) {
    const today = new Date().toISOString().slice(0, 10);
    const groups = await Group.findAll({
        where: {
            arrival_date: {
                [Op.lte]: today
            },
            departure_date: {
                [Op.gte]: today
            }
        },
        attributes: ["name", "booking_number", "group_id", "arrival_date", "departure_date"],
    });
    const grouped = {
        arriving: groups.filter(
            group => group.arrival_date === today
        ),
        staying: groups.filter(
            group => group.arrival_date < today && group.departure_date > today
        ),
        leaving: groups.filter(
            group => group.departure_date === today
        )
    };
    res.json(grouped);
}

// GET /groups/:id
export async function getGroup(req, res) {
    const id = req.params.id;
    const group = await Group.findByPk(id, {
        include: [
            {
                model: Subgroup,
                as: "subgroups"
            }
        ]
    });
    res.json(group);
}

// GET /groups/byday:day
export async function getGroupsByDay(req, res) {
    const day = req.params.day;

    const groups = await Group.findAll({
        where: {
            arrival_date: { [Op.lte]: day },
            departure_date: { [Op.gte]: day }
        },
        include: [
            {
                model: Subgroup,
                as: "subgroups"
            }
        ]
    });

    res.json(groups);
}

// POST /groups
export async function createGroup(req, res) {
    const group = await Group.create(req.body);
    // await group.setSubgroups(req.body.subgroups);
    res.json(group);

    const history = await History.create({ table_name: "groups", record_id: group.group_id, action: "create", user_id: req.session.user.id });
}

// PUT /groups/:id
export async function updateGroup(req, res) {
    try {

        const {
            name,
            booking_number,

            arrival_date,
            departure_date,

            contact_name,
            contact_phone,
            contact_email,

            accomodation,
            type
        } = req.body;

        const group = await Group.findByPk(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        await group.update({
            name,
            booking_number,

            arrival_date,
            departure_date,

            contact_name,
            contact_phone,
            contact_email,

            accomodation,
            type
        });

        const logentry = await History.create({ table_name: "groups", record_id: group.group_id, action: "change", changes: "info", user_id: req.session.user.id });

        return res.status(200).json({
            message: "Group updated successfully",
            group: {
                group_id: group.group_id,
                name: group.name,
                booking_number: group.booking_number
            }
        });

    } catch (error) {
        console.error("Update group error:", error);

        return res.status(500).json({
            message: "Failed to update group",
            error: error.message
        });
    }
}

// PUT /groups/notes/:id
export async function updateGroupNotes(req, res) {
    try {
        const {
            notes
        } = req.body;

        const group = await Group.findByPk(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        await group.update({
            notes
        });

        const logentry = await History.create({ table_name: "groups", record_id: group.group_id, action: "change", changes: "notes", user_id: req.session.user.id });

        return res.status(200).json({
            message: "Group updated successfully",
            group: {
                group_id: group.group_id,
                name: group.name,
                booking_number: group.booking_number,
                notes: notes.group
            }
        });

    } catch (error) {
        console.error("Update group error:", error);

        return res.status(500).json({
            message: "Failed to update group",
            error: error.message
        });
    }
}