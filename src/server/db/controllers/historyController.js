// src/server/db/controllers/historyController.js

import { History, User, Group, Booking, Activity } from "../models/index.js";
import { Op } from "sequelize";

const models = {
    users: User,
    groups: Group,
    bookings: Booking,
    activities: Activity
};

// GET /history
export async function getHistory(req, res) {
    const entries = await History.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ],
        order: [["createdAt", "DESC"]]
    });

    for (const entry of entries) {
        const Model = models[entry.table_name];

        if (Model) {
            entry.dataValues.record = await Model.findByPk(entry.record_id);
        } else {
            entry.dataValues.record = null;
        }
    }

    res.json(entries);
}

// GET /history/user/:id
export async function getHistoryOfUser(req, res) {
    const user_id = req.params.id;
    const entries = await History.findAll({
        where: {
            user_id: user_id
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ],
        order: [["createdAt", "DESC"]]
    });

    for (const entry of entries) {
        const Model = models[entry.table_name];

        if (Model) {
            entry.dataValues.record = await Model.findByPk(entry.record_id);
        } else {
            entry.dataValues.record = null;
        }
    }

    res.json(entries);
}

// GET /history/user/recent/:id
export async function getRecentHistoryOfUser(req, res) {
    const user_id = req.params.id;
    const entries = await History.findAll({
        limit: 10,
        where: {
            user_id: user_id
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ],
        order: [["createdAt", "DESC"]]
    });

    for (const entry of entries) {
        const Model = models[entry.table_name];

        if (Model) {
            entry.dataValues.record = await Model.findByPk(entry.record_id);
        } else {
            entry.dataValues.record = null;
        }
    }

    res.json(entries);
}

// GET /history/group/:id
export async function getHistoryOfGroup(req, res) {
    const group_id = req.params.id;

    const entries = await History.findAll({
        where: {
            [Op.and]: [{ table_name: "groups" }, { record_id: group_id }]
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ]
    });

    for (const entry of entries) {
        const Model = models[entry.table_name];

        if (Model) {
            entry.dataValues.record = await Model.findByPk(entry.record_id);
        } else {
            entry.dataValues.record = null;
        }
    }

    res.json(entries);
}

// GET /history/group/:id
export async function getRecentHistoryOfGroup(req, res) {
    const group_id = req.params.id;

    const entries = await History.findAll({
        limit: 10,
        where: {
            [Op.and]: [{ table_name: "groups" }, { record_id: group_id }]
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ]
    });

    for (const entry of entries) {
        const Model = models[entry.table_name];

        if (Model) {
            entry.dataValues.record = await Model.findByPk(entry.record_id);
        } else {
            entry.dataValues.record = null;
        }
    }

    res.json(entries);
}

// POST /history/
export async function log(req, res) {
    const entry = await History.create({
        table_name: "groups",
        record_id: group.group_id,
        action: "create",
        user_id: req.session.user.id
    });
    res.json(entry);
}


