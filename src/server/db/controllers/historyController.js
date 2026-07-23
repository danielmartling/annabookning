// src/server/db/controllers/historyController.js

import { History, User } from "../models/index.js";
import { Op } from "sequelize";

// GET /history
async function getHistory(req, res) {
    const entries = await History.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ]
    });
    res.json(entries);
}

// GET /history/user/:id
async function getHistoryOfUser(req, res) {
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
        ]
    });
    res.json(entries);
}

// GET /history/user/recent/:id
async function getRecentHistoryOfUser(req, res) {
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
        ]
    });
    res.json(entries);
}

// GET /history/group/:id
async function getHistoryOfGroup(req, res) {
    const group_id = req.params.group_id;

    const entries = await History.findAll({
        where: {
            group_id: group_id
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ['user_id', 'username', 'displayname', 'role', 'permission'],
            }
        ]
    });

    res.json(entries);
}

// POST /history/
async function log(req, res) {
    const entry = await History.create({
        table_name: "groups",
        record_id: group.group_id,
        action: "create",
        user_id: req.session.user.id
    });
    res.json(entry);
}



export { getHistory, getHistoryOfUser, getRecentHistoryOfUser, getHistoryOfGroup, log };