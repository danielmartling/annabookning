import { History } from "../models/index.js";

export async function log(req, table, recordId, action, changes = null) {
    return History.create({
        table_name: table,
        record_id: recordId,
        action,
        changes,
        user_id: req.session.user.id
    });
}