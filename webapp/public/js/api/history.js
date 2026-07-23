export async function getHistory() {
    try {
        const response = await fetch('/api/history');
        if (!response.ok) throw new Error("Request failed");
        const history = await response.json();
        return history;
    } catch (err) {
        console.error(err);
    }
}

export async function getHistoryOfUser(userId) {
    try {
        const response = await fetch(`/api/history/user/${userId}`);
        if (!response.ok) throw new Error("Request failed");
        const history = await response.json();
        return history;
    } catch (err) {
        console.error(err);
    }
}

export async function getRecentHistoryOfUser(userId) {
    try {
        const response = await fetch(`/api/history/user/recent/${userId}`);
        if (!response.ok) throw new Error("Request failed");
        const history = await response.json();
        return history;
    } catch (err) {
        console.error(err);
    }
}