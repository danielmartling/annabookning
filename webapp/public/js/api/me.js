export async function getMe() {
    try {
        const response = await fetch('/api/me');
        if (!response.ok) throw new Error("Request failed");
        const user = await response.json();
        return user;
    } catch (err) {
        console.error(err);
    }
}

export async function updateMyInfo(user) {
    const response = await fetch(`/api/me/info`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.username,
            displayname: user.displayname,
            email: user.email,
            phone: user.phone
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
    }

    return await response.json();
}

export async function updateMyPassword(user) {
    const response = await fetch(`/api/me/password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oldpassword: user.oldpassword,
            newpassword: user.newpassword,
            repeatpassword: user.repeatpassword
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
    }

    return await response.json();
}