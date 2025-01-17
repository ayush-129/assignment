import { getAuthToken } from "./utils.js";

import { BACKEND_URL } from './config.js';

const discoveryBaseURL = `${BACKEND_URL}/api/profile`;
const connectionBaseURL = `${BACKEND_URL}/api/connections`; // New base URL for connections

export function renderDiscoveryFilters() {
  document.getElementById("content").innerHTML = `
        <div id="filters">
    <h2>Discover Mentors & Mentees</h2>
    <select id="role-filter">
        <option value="">All</option>
        <option value="mentor">Mentor</option>
        <option value="mentee">Mentee</option>
    </select>
    <input type="text" id="skills-filter" placeholder="Filter by skills (comma-separated)" />
    <button id="apply-filters">Apply Filters</button>
</div>
<div id="discovery-results">
    <!-- Profile cards will be dynamically injected here -->
</div>

    `;

  document
    .getElementById("apply-filters")
    .addEventListener("click", fetchAndDisplayProfiles);
}

async function fetchAndDisplayProfiles() {
  const token = getAuthToken();
  const role = document.getElementById("role-filter").value;
  const skills = document.getElementById("skills-filter").value;

  const queryParams = new URLSearchParams();
  if (role) queryParams.append("role", role);
  if (skills) queryParams.append("skills", skills);

  try {
    const response = await fetch(
      `${discoveryBaseURL}?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const profiles = await response.json();
      displayProfiles(profiles);
    } else {
      const errorMessage = await response.text();
      console.error(`Error fetching profiles: ${errorMessage}`);
      alert("Failed to fetch profiles. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching profiles:", error);
    alert("An error occurred while fetching profiles.");
  }
}

function displayProfiles(profiles) {
  const resultsContainer = document.getElementById("discovery-results");

  if (profiles.length > 0) {
    resultsContainer.innerHTML = profiles
      .map(
        (profile) => `
            <div class="profile-card">
                <h3>${profile.name || "Unknown"}</h3>
                <p>Role: ${profile.role}</p>
                <p>Skills: ${profile.skills}</p>
                <p>${profile.bio || "No bio available."}</p>
                <button class="request-button" data-user-id="${
                  profile.id
                }">Request Mentorship</button>
            </div>
        `
      )
      .join("");

    // Add event listeners to all "Request Mentorship" buttons
    document.querySelectorAll(".request-button").forEach((button) => {
      button.addEventListener("click", () =>
        sendRequest(button.dataset.userId)
      );
    });
  } else {
    resultsContainer.innerHTML =
      "<p>No profiles found matching the criteria.</p>";
  }
}

export async function sendRequest(receiverId) {
  const token = getAuthToken();
  const senderId = localStorage.getItem("userId"); // Get the logged-in user's ID

  try {
    const response = await fetch(connectionBaseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mentor_id: senderId, // Adjust based on sender role
        mentee_id: receiverId,
      }),
    });

    if (response.ok) {
      alert("Mentorship request sent successfully!");
    } else {
      const errorMessage = await response.text();
      console.error(`Error sending request: ${errorMessage}`);
      alert("Failed to send mentorship request. Please try again.");
    }
  } catch (error) {
    console.error("Error sending request:", error);
    alert("An error occurred while sending the request.");
  }
}
