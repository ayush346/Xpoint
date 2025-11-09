import { json, parseJsonBody, createTransport } from "./_lib.js";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return json(res, 405, { error: "Method Not Allowed" });
	}
	const body = await parseJsonBody(req);
	const email = String(body?.email || "").trim();
	const emailOk = /^\S+@\S+\.\S+$/.test(email);
	if (!emailOk) {
		return json(res, 400, { error: "Valid email is required" });
	}
	const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
	const transporter = createTransport();
	if (!transporter) {
		return json(res, 500, { error: "Email service not configured" });
	}
	const subject = `Waitlist – New signup`;
	const text = `A new user joined the waitlist.

Email: ${email}
`;
	const html = `<h2>New Waitlist signup</h2>
<p><strong>Email:</strong> ${email}</p>`;
	await transporter.sendMail({
		from: process.env.SMTP_FROM || `"Xpoint Notifications" <${process.env.SMTP_USER}>`,
		to: toEmail,
		subject,
		text,
		html
	});
	return json(res, 200, { ok: true });
}


