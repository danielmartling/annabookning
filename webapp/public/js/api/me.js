async function getMe() {
    try {
        const response = await fetch('/api/me');
        if (!response.ok) throw new Error("Request failed");
        const user = await response.json();
        return user;
    } catch (err) {
        console.error(err);
    }
}

export {
    getMe
}