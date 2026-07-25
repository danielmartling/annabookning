export async function getProgramDay(day) {
    try {
        const response = await fetch(`/api/programday/${day}`);
        if (!response.ok) throw new Error("Request failed");
        const [programDay, exists] = await response.json();
        return programDay;
    } catch (err) {
        console.error(err);
    }
}

export async function updateProgramDay(day, payload) {
    const response = await fetch(`/api/programday/${day}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: payload.title,
            message: payload.message
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update program day");
    }

    return await response.json();
}