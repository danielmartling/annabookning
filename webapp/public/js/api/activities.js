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
