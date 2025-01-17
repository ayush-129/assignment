import { getAuthToken } from './utils.js';

import { BACKEND_URL } from './config.js';

const profileBaseURL = `${BACKEND_URL}/api/profile`;

export function renderProfileForm() {
    document.getElementById('content').innerHTML = `
        <div class="profile-form-container">
    <form id="profile-form">
        <h2>Set Up Profile</h2>
        <select id="role">
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
        </select>
        <input type="text" id="skills" placeholder="Skills (comma-separated)" required />
        <textarea id="bio" placeholder="Brief Bio"></textarea>
        <button type="submit">Save Profile</button>
    </form>
</div>

    `;

    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const role = document.getElementById('role').value;
        const skills = document.getElementById('skills').value;
        const bio = document.getElementById('bio').value;
        const token = getAuthToken();

        try {
            const response = await fetch(profileBaseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role, skills, bio }),
            });

            if (response.ok) {
                alert('Profile saved successfully!');
            } else {
                alert('Error saving profile. Try again.');
            }
        } catch (error) {
            console.error(error);
        }
    });
}
