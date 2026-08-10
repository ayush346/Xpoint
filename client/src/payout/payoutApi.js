import axios from "axios";
import { getStoredAuthHeader, clearStoredAuthHeader } from "./payoutAuth.js";
import { BASE_URL } from "../IPConfig.js";

// Separate backend from the site's own Node server (utils/api.js) —
// this talks to the main Java/Spring backend that owns orders & shops.
const baseUrl = BASE_URL;

class UnauthorizedError extends Error {}

function client() {
	const authHeader = getStoredAuthHeader();
	return axios.create({
		baseURL: baseUrl,
		headers: authHeader ? { Authorization: authHeader } : {},
	});
}

async function request(fn) {
	try {
		return await fn();
	} catch (err) {
		if (err?.response?.status === 401) {
			clearStoredAuthHeader();
			throw new UnauthorizedError("Session expired, please log in again.");
		}
		throw err;
	}
}

export function payoutGet(path, config = {}) {
	return request(() => client().get(`${path}`, config)).then((res) => res.data);
}

export function payoutPost(path, body = {}, config = {}) {
	return request(() => client().post(`${path}`, body, config)).then((res) => res.data);
}

export { UnauthorizedError, baseUrl as payoutApiBaseUrl };
