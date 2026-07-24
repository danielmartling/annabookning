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
        ]
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
        }
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

