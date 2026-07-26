// Lightweight admin-session helper for the shop payouts tool.
// The backend protects /api/admin/** with HTTP Basic Auth; since we're
// using a custom login form instead of the browser's native prompt, we
// build the Authorization header ourselves and carry it for the tab's
// lifetime (sessionStorage — cleared when the tab closes).

const STORAGE_KEY = "xpoint_admin_auth";

export function buildAuthHeader(username, password) {
	return `Basic ${btoa(`${username}:${password}`)}`;
}

export function getStoredAuthHeader() {
	return sessionStorage.getItem(STORAGE_KEY);
}

export function setStoredAuthHeader(authHeader) {
	sessionStorage.setItem(STORAGE_KEY, authHeader);
}

export function clearStoredAuthHeader() {
	sessionStorage.removeItem(STORAGE_KEY);
}
