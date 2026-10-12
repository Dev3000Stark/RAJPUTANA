"use strict";

const API_BASE_URL = "http://127.0.0.1:5000/api";

// Send requests to the Python backend
async function apiRequest(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
    }

    return result;
}

// Save login details returned by the backend
function saveUserSession(result) {
    localStorage.setItem("rajputanaUser", JSON.stringify(result.user));

    if (result.token) {
        sessionStorage.setItem("rajputanaToken", result.token);
    }
}

// Display messages on forms
function showMessage(element, message, success = false) {
    if (!element) return;

    element.textContent = message;
    element.style.color = success ? "#16803c" : "#c0392b";
}

// Toggle password visibility
document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);

        if (input) {
            input.type = input.type === "password" ? "text" : "password";
        }
    });
});

// Login page password visibility
const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        const input = document.getElementById("password");

        if (input) {
            input.type = input.type === "password" ? "text" : "password";
        }
    });
}

// REGISTRATION
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async event => {
        event.preventDefault();

        const name = document.getElementById("fullName")?.value.trim();
        const email = document.getElementById("registerEmail")?.value.trim();
        const password = document.getElementById("registerPassword")?.value;
        const confirmPassword = document.getElementById("confirmPassword")?.value;
        const acceptTerms = document.getElementById("acceptTerms")?.checked;
        const message = document.getElementById("registerMessage");
        const submitButton = registerForm.querySelector('[type="submit"]');

        if (!name || !email || !password || !confirmPassword) {
            showMessage(message, "Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            showMessage(message, "Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            showMessage(message, "Passwords do not match.");
            return;
        }

        if (!acceptTerms) {
            showMessage(message, "Please accept the terms and conditions.");
            return;
        }

        try {
            if (submitButton) submitButton.disabled = true;

            showMessage(message, "Creating your account...", true);

            const result = await apiRequest("/register", {
                name,
                email,
                password
            });

            if (result.user) {
                saveUserSession(result);
                showMessage(message, "Account created! Redirecting...", true);

                setTimeout(() => {
                    window.location.href = "profile.html";
                }, 700);
            } else {
                showMessage(message, result.message || "Account created. Please log in.", true);

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
            }
        } catch (error) {
            showMessage(
                message,
                error.message === "Failed to fetch"
                    ? "Cannot connect to the server. Make sure the Python backend is running."
                    : error.message
            );
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async event => {
        event.preventDefault();

        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value;
        const message = document.getElementById("loginMessage");
        const submitButton = loginForm.querySelector('[type="submit"]');

        if (!email || !password) {
            showMessage(message, "Please enter your email and password.");
            return;
        }

        try {
            if (submitButton) submitButton.disabled = true;

            showMessage(message, "Signing you in...", true);

            const result = await apiRequest("/login", {
                email,
                password
            });

            saveUserSession(result);
            showMessage(message, "Login successful! Redirecting...", true);

            setTimeout(() => {
                window.location.href = "profile.html";
            }, 700);
        } catch (error) {
            showMessage(
                message,
                error.message === "Failed to fetch"
                    ? "Cannot connect to the server. Make sure the Python backend is running."
                    : error.message
            );
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

// Forgot-password placeholder
const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
    forgotPassword.addEventListener("click", event => {
        event.preventDefault();
        alert("Password recovery is not available yet. Please contact the project administrator.");
    });
}