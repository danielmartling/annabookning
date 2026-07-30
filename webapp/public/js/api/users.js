import { apiFetch } from "./index.js";

// export async function getAllUsers() {
//     try {
//         const response = await fetch('/api/users');
//         if (!response.ok) throw new Error("Request failed");
//         const users = await response.json();
//         return users;
//     } catch (err) {
//         console.error(err);
//     }
// }

export async function getAllUsers() {
    return apiFetch(`/api/users/`);
}

export async function getUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Request failed");
        const user = await response.json();
        return user;
    } catch (err) {
        console.error(err);
    }
}

// export async function createUser(user) {
//     try {
//         const response = await fetch("/api/users", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 username: user.username.trim().toLowerCase(),
//                 displayname: user.displayname.trim(),
//                 password: user.password,
//                 repeatpassword: user.repeatpassword,
//                 active: user.active,
//                 role: user.role,
//                 permission: user.permission,
//                 email: user.email?.trim() || null,
//                 phone: user.phone?.trim() || null
//             })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             showWarning(data.error || `Server responded with ${response.status}`);
//             return false;
//         }

//         showSuccess("User created successfully.");
//         return data;

//     } catch (error) {
//         showWarning(`Unexpected error: ${error.message}`);
//         return false;
//     }
// }

export async function createUser(user) {
    return apiFetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

export async function updateUserInfo(userId, user) {
    return apiFetch(`/api/users/info/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

export async function updateUserPassword(userId, user) {
    return apiFetch(`/api/users/password/${userId}`, {
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
}

export async function updateUserRoles(userId, user) {
    const response = await fetch(`/api/users/roles/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            active: user.active,
            role: user.role,
            permission: user.permission,
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
    }

    return await response.json();
}