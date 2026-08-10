import { json, parseJsonBody, createTransport } from "./_lib.js";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return json(res, 405, { error: "Method Not Allowed" });
	}
	try {
		const body = await parseJsonBody(req);
		const fullName = String(body?.fullName || "").trim();
		const phone = String(body?.phone || "").trim();
		const email = String(body?.email || "").trim();
		const address = String(body?.address || "").trim();
		const emailOk = /^\S+@\S+\.\S+$/.test(email);
		if (!fullName || !phone || !emailOk || !address) {
			return json(res, 400, { error: "Invalid form data" });
		}
		const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
		const transporter = createTransport();
		if (!transporter) {
			return json(res, 500, { error: { code: "SMTP_NOT_CONFIGURED", message: "Email service not configured (missing SMTP_HOST/SMTP_USER/SMTP_PASS)" } });
		}
		await transporter.verify().catch(() => {});
		const subject = `Desktop Download Request – ${fullName}`;
		const text = `New Desktop Download request:

Name: ${fullName}
Phone: ${phone}
Email: ${email}
Address:
${address}
`;
		const html = `<h2>New Desktop Download request</h2>
<p><strong>Name:</strong> ${fullName}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Address:</strong><br/>${address.replace(/\n/g, "<br/>")}</p>`;
		await transporter.sendMail({
			from: process.env.SMTP_FROM || `"Xpoint Notifications" <${process.env.SMTP_USER}>`,
			to: toEmail,
			subject,
			text,
			html
		});
		return json(res, 200, { ok: true });
	} catch (err) {
		console.error("notify/download error:", err);
		return json(res, 500, { error: { code: "EMAIL_SEND_FAILED", message: err?.message || "Server error" } });
	}
}


