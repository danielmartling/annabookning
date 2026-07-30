// /webapp/public/js/api/index.js


import * as auth from "./auth.js";
import * as groups from "./groups.js";
import * as subgroups from "./subgroups.js";
import * as users from "./users.js";
import * as me from "./me.js";
import * as history from "./history.js";
import * as programDay from "./programDay.js";
import * as activities from "./activities.js";
import * as activityCategories from "./activityCategories.js";
import * as activityTags from "./activityTags.js";

window.api = {
    ...auth,
    ...groups,
    ...subgroups,
    ...users,
    ...me,
    ...history,
    ...programDay,
    ...activities,
    ...activityCategories,
    ...activityTags
};