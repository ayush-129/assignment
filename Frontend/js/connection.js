import { getAuthToken } from './utils.js';
import { BACKEND_URL } from './config.js';

const connectionBaseURL = `${BACKEND_URL}/api/connection`;

export async function fetchProfiles() {
    const token = getAuthToken();

    try {
        const response = await fetch(`${connectionBaseURL}/profiles`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const profiles = await response.json();
            document.getElementById('content').innerHTML = profiles.map(profile => `
                <div class="profile-card">
                    <h3>${profile.name}</h3>
                    <p>Role: ${profile.role}</p>
                    <p>Skills: ${profile.skills}</p>
                    <button onclick="sendRequest('${profile.id}')">Request Mentorship</button>
                </div>
            `).join('');
        } else {
            alert('Failed to fetch profiles.');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function sendRequest(userId) {
    const token = getAuthToken();

    try {
        const response = await fetch(`${connectionBaseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
        });

        if (response.ok) {
            alert('Request sent!');
        } else {
            alert('Failed to send request.');
        }
    } catch (error) {
        console.error(error);
    }
}
