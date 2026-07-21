// src/server/db/controllers/groupController.js

import { Logentry, User } from "../models/index.js";
import { Op } from "sequelize";

// GET /history/user/:id
async function getHistoryOfUser(req, res) {
    const user_id = req.params.id;

    const entries = await Logentry.findAll({
        where : {
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

    const entries = await Logentry.findAll({
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
    // const entry = await Logentry.create(req.body);
    // res.json(entry);

    const entry = await Logentry.create({ table_name: "groups", record_id: group.group_id, action: "create", user_id: req.session.user.id });
    // console.log(logentry);
    res.json(entry);
}



export { getHistoryOfUser, getHistoryOfGroup, log };