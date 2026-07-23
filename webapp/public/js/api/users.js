async function getAllUsers() {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error("Request failed");
        const users = await response.json();
        return users;
    } catch (err) {
        console.error(err);
    }
}

async function getUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Request failed");
        const user = await response.json();
        return user;
    } catch (err) {
        console.error(err);
    }
}

async function createUser(user) {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username.trim().toLowerCase(),
                displayname: user.displayname.trim(),
                password: user.password,
                repeatpassword: user.repeatpassword,
                active: user.active,
                role: user.role,
                permission: user.permission,
                email: user.email?.trim() || null,
                phone: user.phone?.trim() || null
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return false;
        }

        showSuccess("User created successfully.");
        return data;

    } catch (error) {
        showWarning(`Unexpected error: ${error.message}`);
        return false;
    }
}


export {
    getAllUsers, getUser, createUser
}