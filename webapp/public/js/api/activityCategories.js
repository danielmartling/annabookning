export async function getCategories() {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error("Request failed");
        const categories = await response.json();
        return categories;
    } catch (err) {
        console.error(err);
    }
}

export async function createCategory(category) {
    try {
        const response = await fetch("/api/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: category.name.trim(),
                desc: category.desc.trim(),
                color: category.color,
                active: category.active,
                order: category.order
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

export async function updateCategory(id, category) {
    const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: category.name.trim(),
            desc: category.desc.trim(),
            color: category.color,
            active: category.active,
            order: category.order
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update category");
    }

    showSuccess("Category updated!")
    return await response.json();
}