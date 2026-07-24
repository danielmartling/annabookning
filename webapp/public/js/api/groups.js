export async function getAllGroups() {
    try {
        const response = await fetch('/api/groups');
        if (!response.ok) throw new Error("Request failed");
        const groups = await response.json();
        return groups;
    } catch (err) {
        console.error(err);
    }
}

export async function getGroupsOnIsland() {
    try {
        const response = await fetch('/api/groups/island');
        if (!response.ok) throw new Error("Request failed");
        const groups = await response.json();
        return groups;
    } catch (err) {
        console.error(err);
    }
}

export async function getGroupsByDay(day) {
    try {
        const response = await fetch(`/api/groups/byday/${day}`);
        if (!response.ok) throw new Error("Request failed");
        const groups = await response.json();
        return groups;
    } catch (err) {
        console.error(err);
    }
}

export async function createGroup(group) {
    try {
        const response = await fetch("/api/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: group.name.trim(),
                booking_number: group.booking_number,
                arrival_date: group.arrival_date,
                departure_date: group.departure_date,
                accomodation: group.accomodation,
                type: group.type,
                contact_name: group.contact_name?.trim() || null,
                contact_phone: group.contact_phone?.trim() || null,
                contact_email: group.contact_email?.trim() || null
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return false;
        }

        showSuccess("Group created successfully.");
        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}