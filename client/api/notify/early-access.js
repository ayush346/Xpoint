import { json, parseJsonBody, createTransport } from "./_lib.js";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return json(res, 405, { error: "Method Not Allowed" });
	}
	const body = await parseJsonBody(req);
	const fullName = String(body?.fullName || "").trim();
	const role = String(body?.role || "").trim().toLowerCase();
	const phone = String(body?.phone || "").trim();
	const email = String(body?.email || "").trim();
	const roleOk = role === "student" || role === "vendor";
	const emailOk = /^\S+@\S+\.\S+$/.test(email);
	const phoneOk = phone.length >= 7 && phone.length <= 20;
	if (!fullName || !roleOk || !emailOk || !phoneOk) {
		return json(res, 400, { error: "Invalid form data" });
	}
	const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
	const transporter = createTransport();
	if (!transporter) {
		return json(res, 500, { error: "Email service not configured" });
	}
	const subject = `Early Access – ${fullName} (${role})`;
	const text = `New Early Access submission:

Name: ${fullName}
Role: ${role}
Phone: ${phone}
Email: ${email}
`;
	const html = `<h2>New Early Access submission</h2>
<p><strong>Name:</strong> ${fullName}</p>
<p><strong>Role:</strong> ${role}</p>
<p><strong>Phone:</strong> ${phone}</p>
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


