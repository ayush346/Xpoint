import { json, parseJsonBody, createTransport } from "./_lib.js";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return json(res, 405, { error: "Method Not Allowed" });
	}
	const body = await parseJsonBody(req);
	const fullName = String(body?.fullName || "").trim();
	const countryCode = String(body?.countryCode || "").trim();
	const country = String(body?.country || "").trim();
	const phone = String(body?.phone || "").trim();
	const email = String(body?.email || "").trim();
	const address = String(body?.address || "").trim();
	const emailOk = /^\S+@\S+\.\S+$/.test(email);
	if (!fullName || !countryCode || !country || !phone || !emailOk || !address) {
		return json(res, 400, { error: "Invalid form data" });
	}
	const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
	const transporter = createTransport();
	if (!transporter) {
	 return json(res, 500, { error: "Email service not configured" });
	}
	const subject = `Partner With Us – ${fullName} (${country})`;
	const text = `New Partner With Us submission:

Name: ${fullName}
Country Code: ${countryCode}
Phone: ${phone}
Country: ${country}
Email: ${email}
Address:
${address}
`;
	const html = `<h2>New Partner With Us submission</h2>
<p><strong>Name:</strong> ${fullName}</p>
<p><strong>Country Code:</strong> ${countryCode}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Country:</strong> ${country}</p>
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
}


