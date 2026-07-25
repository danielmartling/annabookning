// src/server/db/controllers/groupController.js

import { Group, Subgroup, History } from "../models/index.js";
import { Op } from "sequelize";

const defaultSubgroup = {
    name: "Deltagare",
    tag: "delt",
}

const defaultScoutGroup = [
    {
        name: "Bävrar",
        tag: "bav",
        desc: "Småbarn"
    },
    {
        name: "Spårare",
        tag: "spar",
        desc: "8-9 år"
    },
    {
        name: "Upptäckare",
        tag: "upp",
        desc: "10-11 år"
    },
    {
        name: "Äventyrare",
        tag: "aven",
        desc: "12-15 år"
    },
    {
        name: "Utmanare",
        tag: "utm",
        desc: "15-18 år"
    },
    {
        name: "Rover",
        tag: "rov",
        desc: "18+ år"
    },
]

// POST /subgroups/default/
export async function createDefaultSubgroup(req, res) {
    const group = await Group.findByPk(req.body.group_id);
    // await group.setSubgroups(req.body.subgroups);
    await Subgroup.create({
        ...defaultSubgroup,
        group_id: group.group_id
    })
    res.json(group);

    const history = await History.create({ table_name: "groups", record_id: group.group_id, action: "create", changes: "subgroup", user_id: req.session.user.id });
}

// POST /subgroups/default/scoutgroup
export async function createDefaultScoutgroup(req, res) {
    const group = await Group.findByPk(req.body.group_id);
    // await group.setSubgroups(req.body.subgroups);
    await Subgroup.bulkCreate(
        defaultScoutGroup.map((subgroup) => ({
            ...subgroup,
            group_id: group.group_id,
        }))
    )
    res.json(group);

    const history = await History.create({ table_name: "groups", record_id: group.group_id, action: "create", changes: "subgroup", user_id: req.session.user.id });
}
