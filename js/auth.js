function getUsers() {
    return JSON.parse(localStorage.getItem("ticketBookingUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("ticketBookingUsers", JSON.stringify(users));
}

function setError(elementId, message) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}

function clearRegistrationErrors() {
    const errors = [
        "fullNameError",
        "emailError",
        "phoneError",
        "usernameError",
        "passwordError",
        "confirmPasswordError"
    ];

    errors.forEach(id => setError(id, ""));
}

function validateRegistration(data, users) {
    let valid = true;

    clearRegistrationErrors();

    if (!data.fullName || data.fullName.length < 3) {
        setError("fullNameError", "Please enter a valid full name.");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(data.email)) {
        setError("emailError", "Please enter a valid email.");
        valid = false;
    }

    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(data.phone)) {
        setError("phoneError", "Phone number must contain 10 digits.");
        valid = false;
    }

    if (!data.username || data.username.length < 4) {
        setError("usernameError", "Username must contain at least 4 characters.");
        valid = false;
    }

    if (!data.password || data.password.length < 6) {
        setError("passwordError", "Password must contain at least 6 characters.");
        valid = false;
    }

    if (data.password !== data.confirmPassword) {
        setError("confirmPasswordError", "Passwords do not match.");
        valid = false;
    }

    const duplicateEmail = users.some(
        user => user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (duplicateEmail) {
        setError("emailError", "Email is already registered.");
        valid = false;
    }

    const duplicateUsername = users.some(
        user => user.username.toLowerCase() === data.username.toLowerCase()
    );

    if (duplicateUsername) {
        setError("usernameError", "Username is already taken.");
        valid = false;
    }

    return valid;
}


// User Registration
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = {
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value
        };

        const users = getUsers();

        if (!validateRegistration(data, users)) {
            return;
        }

        const newUser = {
            id: Date.now(),
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            username: data.username,
            password: data.password
        };

        users.push(newUser);
        saveUsers(users);

        const message = document.getElementById("registrationMessage");

        message.textContent = "Registration successful. Redirecting to login...";
        message.className = "message success-message";

        registrationForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}


// User Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        setError("loginUsernameError", "");
        setError("loginPasswordError", "");

        const usernameOrEmail = document
            .getElementById("loginUsername")
            .value.trim();

        const password = document
            .getElementById("loginPassword")
            .value;

        if (!usernameOrEmail) {
            setError("loginUsernameError", "Please enter your email or username.");
            return;
        }

        if (!password) {
            setError("loginPasswordError", "Please enter your password.");
            return;
        }

        const users = getUsers();

        const user = users.find(
            currentUser =>
                currentUser.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
                currentUser.email.toLowerCase() === usernameOrEmail.toLowerCase()
        );

        if (!user || user.password !== password) {
            const message = document.getElementById("loginMessage");

            message.textContent = "Invalid username/email or password.";
            message.className = "message error-message";

            return;
        }

        sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                username: user.username
            })
        );

        const message = document.getElementById("loginMessage");

        message.textContent = "Login successful. Redirecting...";
        message.className = "message success-message";

        setTimeout(() => {
            window.location.href = "events.html";
        }, 1000);
    });
}


// Logout
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


// Get currently logged-in user
function getLoggedInUser() {
    const user = sessionStorage.getItem("loggedInUser");

    return user ? JSON.parse(user) : null;
}