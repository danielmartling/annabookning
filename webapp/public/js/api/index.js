import * as auth from "./auth.js";
import * as groups from "./groups.js";
import * as users from "./users.js";
import * as me from "./me.js";
import * as history from "./history.js";

window.api = {
    ...auth,
    ...groups,
    ...users,
    ...me,
    ...history
};