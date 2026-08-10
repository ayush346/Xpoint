import axios from "axios";

const apiBaseUrl = (import.meta?.env?.VITE_API_BASE_URL || "").trim();

export function post(path, data, config = {}) {
	const url = `${apiBaseUrl}${path}`;
	return axios.post(url, data, config);
}





