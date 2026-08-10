import nodemailer from "nodemailer";
export function json(res, statusCode, data) {
	res.statusCode = statusCode;
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.end(JSON.stringify(data));
}

export async function parseJsonBody(req) {
	return new Promise((resolve) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk;
		});
		req.on("end", () => {
			try {
				resolve(body ? JSON.parse(body) : {});
			} catch {
				resolve({});
			}
		});
	});
}

export function createTransport() {
	const host = process.env.SMTP_HOST;
	const port = Number(process.env.SMTP_PORT || 587);
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;
	const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
	if (!host || !user || !pass) {
		return null;
	}
	return nodemailer.createTransport({
		host,
		port,
		secure,
		auth: { user, pass }
	});
}


