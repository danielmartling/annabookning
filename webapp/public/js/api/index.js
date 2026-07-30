// /webapp/public/js/api/index.js

// Template method for api fetches.
// url: eg. /api/users/
// options: eg. {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user)
// }
export async function apiFetch(url, options = {}) {
    const response = await fetch(url, options);

    let data;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const error = new Error(
            data?.message ||
            `Request failed (${response.status})`
        );

        error.status = response.status;
        error.code = data?.code;
        error.field = data?.field;
        error.url = url;
        
        throw error;
    }

    return data;
}

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
    // apiFetch,
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