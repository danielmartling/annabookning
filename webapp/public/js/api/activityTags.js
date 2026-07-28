export async function getTags() {
    try {
        const response = await fetch('/api/tags');
        if (!response.ok) throw new Error("Request failed");
        const tags = await response.json();
        return tags;
    } catch (err) {
        console.error(err);
    }
}

export async function createTag(tag) {
    try {
        const response = await fetch("/api/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: tag.name.trim(),
                desc: tag.desc.trim(),
                color: tag.color,
                active: tag.active
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

export async function updateTag(id, tag) {
    const response = await fetch(`/api/tags/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: tag.name.trim(),
            desc: tag.desc.trim(),
            color: tag.color,
            active: tag.active
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update tag");
    }

    showSuccess("Tag updated!")
    return await response.json();
}