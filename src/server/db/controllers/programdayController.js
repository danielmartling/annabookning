// src/server/db/controllers/programdayController.js

import { ProgramDay, History } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";


// GET /programday/:day
export async function getProgramDay(req, res) {
    const day = await ProgramDay.findOrCreate({
        where: {
            day: req.params.day
        }
    });

    res.json(day);
}


// PUT /programday/:id
export async function updateProgramDay(req, res) {
    try {
        const {
            title,
            message
        } = req.body;

        const programDay = await ProgramDay.findOne({
            where: {
                day: req.params.day
            }
        });

        if (!programDay) {
            return res.status(404).json({
                message: "Program day not found"
            });
        }

        await programDay.update({
            title,
            message
        });

        const logentry = await History.create({ table_name: "program_days", record_id: programDay.day_id, action: "change", changes: "message", user_id: req.session.user.id });

        return res.status(200).json({
            message: "Program day updated successfully",
            programDay: {
                title: programDay.title,
                message: programDay.message
            }
        });

    } catch (error) {
        console.error("Update program day error:", error);

        return res.status(500).json({
            message: "Failed to update program day",
            error: error.message
        });
    }
}