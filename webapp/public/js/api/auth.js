async function login(username, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.trim().toLowerCase(),
                password: password.trim()
            })
        });

        if (!response.ok) {
            showWarning(data.error || `Server responded with ${response.status}`);
            return;
        }

        window.location = "/?message=login";
    } catch (error) {
        showWarning("Unexpected error: " + error.message);
    }
}

async function logout() {
    fetch('/api/logout', { method: 'POST', credentials: 'include' })
        .then(res => {
            if (!res.ok) throw new Error('Logout failed');
            return res.json();
        })
        .then(() => {
            window.location.href = '/login.html?message=logout';
        }).catch(err => {
            console.error(err);
            window.location.href = '/login.html?message=logout';
        });
}

export {
    login, logout
}