import { setAuthToken } from './utils.js';
import { renderProfileForm } from './profile.js';
import { BACKEND_URL } from './config.js';



export function renderSignupForm() {
    // Render signup form dynamically
    document.getElementById('content').innerHTML = `
        <form id="signup-form" class="auth-form">
            <h2>Sign Up</h2>
            <input type="email" id="email" placeholder="Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit" id="signup-btn">Sign Up</button>
            <p id="signup-message" class="message"></p>
        </form>
    `;

    // Attach form submit event listener
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const messageElement = document.getElementById('signup-message');
        const signupButton = document.getElementById('signup-btn');

        // Disable button during submission
        signupButton.textContent = 'Signing Up...';
        signupButton.disabled = true;

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                messageElement.textContent = 'Signup successful! Please log in.';
                messageElement.style.color = 'green';

                // Redirect to login form
                renderLoginForm();
            } else {
                const errorData = await response.json();
                messageElement.textContent = errorData.message || 'Signup failed. Try again.';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error(error);
            messageElement.textContent = 'An error occurred. Please try again.';
            messageElement.style.color = 'red';
        } finally {
            // Re-enable button
            signupButton.textContent = 'Sign Up';
            signupButton.disabled = false;
        }
    });
}

export function renderLoginForm() {
    // Render login form dynamically
    document.getElementById('content').innerHTML = `
        <form id="login-form" class="auth-form">
            <h2>Login</h2>
            <input type="email" id="email" placeholder="Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit" id="login-btn">Login</button>
            <p id="login-message" class="message"></p>
        </form>
    `;

    // Attach form submit event listener
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const messageElement = document.getElementById('login-message');
        const loginButton = document.getElementById('login-btn');

        // Disable button during submission
        loginButton.textContent = 'Logging In...';
        loginButton.disabled = true;

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthToken(data.token);
                messageElement.textContent = 'Login successful!';
                messageElement.style.color = 'green';

                // Navigate to the profile setup page within the SPA
                renderProfileForm();
            } else {
                const errorData = await response.json();
                messageElement.textContent = errorData.message || 'Login failed. Check your credentials.';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error(error);
            messageElement.textContent = 'An error occurred. Please try again.';
            messageElement.style.color = 'red';
        } finally {
            // Re-enable button
            loginButton.textContent = 'Login';
            loginButton.disabled = false;
        }
    });
}
