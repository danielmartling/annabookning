import * as auth from "./auth.js";
import * as groups from "./groups.js";
import * as users from "./users.js";

window.api = {
    ...auth,
    ...groups,
    ...users,
};