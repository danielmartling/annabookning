
export async function createSubgroup(groupId, subgroup) {
    try {
        const response = await fetch(`/api/subgroups/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                group_id: groupId,
                subgroup: subgroup
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return false;
        }

        showSuccess("Subgroup created successfully.");
        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}

export async function createDefaultSubgroup(groupId) {
    try {
        const response = await fetch(`/api/subgroups/default`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                group_id: groupId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return false;
        }

        showSuccess("Subgroup created successfully.");
        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}

export async function createDefaultScoutgroup(groupId) {
    try {
        const response = await fetch(`/api/subgroups/default/scoutgroup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                group_id: groupId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return false;
        }

        showSuccess("Subgroups created successfully.");
        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}