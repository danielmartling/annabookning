export async function getActivities() {
    try {
        const response = await fetch('/api/activities');
        if (!response.ok) throw new Error("Request failed");
        const activities = await response.json();
        return activities;
    } catch (err) {
        console.error(err);
    }
}

export async function getActivitiesByCategory() {
    try {
        const response = await fetch('/api/activities/bycategory');
        if (!response.ok) throw new Error("Request failed");
        const activities = await response.json();
        return activities;
    } catch (err) {
        console.error(err);
    }
}


export async function createActivity(activity) {
    try {
        activity.tag_id === "null" ? null : activity.tag_id;
        const response = await fetch("/api/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category_id: activity.category_id.trim(),
                tag_id: activity.tag_id.trim(),
                title: activity.title,
                subtitle: activity.subtitle,
                order: activity.order,
                // subtitle: activity.subtitle.trim(),
                // desc_short: activity.desc_short.trim(),
                // desc_staff: activity.desc_staff.trim(),
                // desc_guest: activity.desc_guest.trim(),
                // material: activity.material.trim(),
                // place: activity.place.trim(),
                // languages: activity.languages.trim(),
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return false;
        }

        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}

export async function updateActivity(id, activity) {
    try {
        const response = await fetch(`/api/activities/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category_id: activity.category_id.trim(),
                tag_id: activity.tag_id.trim(),
                title: activity.title.trim(),
                subtitle: activity.subtitle.trim(),
                desc_short: activity.desc_short.trim(),
                desc_staff: activity.desc_staff.trim(),
                desc_guest: activity.desc_guest.trim(),
                material: activity.material.trim(),
                place: activity.place.trim(),
                languages: activity.languages.trim(),
            })
        });

        const data = await response.json();

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to update activity");
        }

        showSuccess("Activity updated!")
        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}