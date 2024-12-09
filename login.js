document.addEventListener("DOMContentLoaded", () => {
    // Determine whether the current page is login or register
    const formTitle = document.querySelector("h1").textContent.toLowerCase();

    if (formTitle === "login") {
        handleLoginForm();
    } else if (formTitle === "register") {
        handleRegisterForm();
    }

    // Password visibility toggle
    document.querySelectorAll(".input-box i").forEach((icon) => {
        icon.addEventListener("click", togglePasswordVisibility);
    });
});

// Function to handle Login form
function handleLoginForm() {
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get username and password values
        const username = loginForm.querySelector('#username').value.trim();
        const password = loginForm.querySelector('#password').value;

        // Validate fields
        if (!username || !password) {
            alert("Both username and password are required!");
            return;
        }

        // Retrieve stored credentials from localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        // Simulate login validation (check against localStorage)
        if (username === storedUsername && password === storedPassword) {
            alert("Login successful!");
            window.location.href = "./home.html"; // Redirect to Home Page
        } else {
            alert("Invalid username or password!");
        }
    });
}

// Function to handle Register form
function handleRegisterForm() {
    const registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form values
        const fullName = registerForm.querySelector('input[placeholder="Full Name"]').value.trim();
        const email = registerForm.querySelector('input[placeholder="Email Address"]').value.trim();
        const password = registerForm.querySelector('input[placeholder="Password"]').value;
        const confirmPassword = registerForm.querySelector('input[placeholder="Confirm Password"]').value;

        // Validate fields
        if (!fullName || !email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Save the registration credentials to localStorage
        localStorage.setItem('username', email);  // Using email as username
        localStorage.setItem('password', password);

        // Simulate registration success
        alert("Registration successful! You can now log in.");
        window.location.href = "./index.html"; // Redirect to Login Page
    });
}

// Function to toggle password visibility
function togglePasswordVisibility(event) {
    const input = event.target.previousElementSibling;
    if (input.type === "password") {
        input.type = "text";
        event.target.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    } else {
        input.type = "password";
        event.target.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
}
