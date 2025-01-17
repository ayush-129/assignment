export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

export function removeAuthToken() {
    localStorage.removeItem('authToken');
}
