import { getAuthToken, removeAuthToken } from './utils.js';
import { renderSignupForm, renderLoginForm } from './auth.js';
import { renderDiscoveryFilters } from './discovery.js';

function checkAuth() {
    const token = getAuthToken();
    const authLinks = document.getElementById('auth-links');

    if (token) {
        authLinks.innerHTML = `
            <button id="discover-btn">Discover</button>
            <button id="logout-btn">Logout</button>
        `;

        // Event listener for the "Discover" button
        document.getElementById('discover-btn').addEventListener('click', renderDiscoveryFilters);

        // Event listener for the "Logout" button
        document.getElementById('logout-btn').addEventListener('click', () => {
            removeAuthToken();
            alert('Logged out successfully!');
            window.location.href = 'index.html'; // Redirect to home page
        });
    } else {
        authLinks.innerHTML = `
            <button id="login-btn">Login</button>
            <button id="signup-btn">Sign Up</button>
        `;

        // Event listener for the "Signup" button
        document.getElementById('signup-btn').addEventListener('click', renderSignupForm);

        // Event listener for the "Login" button
        document.getElementById('login-btn').addEventListener('click', renderLoginForm);
    }
}

// Check authentication status and update navigation links on page load
window.onload = checkAuth;
