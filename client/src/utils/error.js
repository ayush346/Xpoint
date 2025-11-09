export function extractUserMessage(error, fallback = "Something went wrong. Please try again.") {
	const apiError = error?.response?.data?.error;
	if (typeof apiError === "string") return apiError;
	if (apiError && typeof apiError === "object") {
		if (typeof apiError.message === "string") return apiError.message;
		try {
			return JSON.stringify(apiError);
		} catch {
			// ignore
		}
	}
	const message = error?.message;
	if (typeof message === "string") return message;
	return fallback;
}


