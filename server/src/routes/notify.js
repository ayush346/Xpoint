import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

function validateBody(body) {
	const fullName = String(body?.fullName || "").trim();
	const role = String(body?.role || "").trim().toLowerCase();
	const phone = String(body?.phone || "").trim();
	const email = String(body?.email || "").trim();
	const roleOk = role === "student" || role === "vendor";
	const emailOk = /^\S+@\S+\.\S+$/.test(email);
	const phoneOk = phone.length >= 7 && phone.length <= 20;
	if (!fullName || !roleOk || !emailOk || !phoneOk) {
		return null;
	}
	return { fullName, role, phone, email };
}

function createTransport() {
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

router.post("/early-access", async (req, res) => {
	try {
		const data = validateBody(req.body);
		if (!data) {
			return res.status(400).json({ error: "Invalid form data" });
		}

		const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
		const transporter = createTransport();

		const subject = `Early Access – ${data.fullName} (${data.role})`;
		const text = `New Early Access submission:

Name: ${data.fullName}
Role: ${data.role}
Phone: ${data.phone}
Email: ${data.email}
`;
		const html = `<h2>New Early Access submission</h2>
<p><strong>Name:</strong> ${data.fullName}</p>
<p><strong>Role:</strong> ${data.role}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Email:</strong> ${data.email}</p>`;

		if (!transporter) {
			console.warn("[notify] SMTP not configured. Would send email to:", toEmail);
			return res.status(200).json({ ok: true, simulated: true });
		}

		await transporter.sendMail({
			from: process.env.SMTP_FROM || `"Xpoint Notifications" <${process.env.SMTP_USER}>`,
			to: toEmail,
			subject,
			text,
			html
		});

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("[notify] early-access error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

export default router;

// Additional Partner With Us notification
router.post("/partner", async (req, res) => {
	try {
		const fullName = String(req.body?.fullName || "").trim();
		const countryCode = String(req.body?.countryCode || "").trim();
		const country = String(req.body?.country || "").trim();
		const phone = String(req.body?.phone || "").trim();
		const email = String(req.body?.email || "").trim();
		const address = String(req.body?.address || "").trim();
		const emailOk = /^\S+@\S+\.\S+$/.test(email);
		if (!fullName || !countryCode || !country || !phone || !emailOk || !address) {
			return res.status(400).json({ error: "Invalid form data" });
		}

		const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
		const transporter = createTransport();

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

		if (!transporter) {
			console.warn("[notify] SMTP not configured. Would send partner email to:", toEmail);
			return res.status(200).json({ ok: true, simulated: true });
		}

		await transporter.sendMail({
			from: process.env.SMTP_FROM || `"Xpoint Notifications" <${process.env.SMTP_USER}>`,
			to: toEmail,
			subject,
			text,
			html
		});

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("[notify] partner error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

// Desktop download request notification
router.post("/download", async (req, res) => {
	try {
		const fullName = String(req.body?.fullName || "").trim();
		const phone = String(req.body?.phone || "").trim();
		const email = String(req.body?.email || "").trim();
		const address = String(req.body?.address || "").trim();
		const emailOk = /^\S+@\S+\.\S+$/.test(email);
		if (!fullName || !phone || !emailOk || !address) {
			return res.status(400).json({ error: "Invalid form data" });
		}

		const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
		const transporter = createTransport();

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

		if (!transporter) {
			console.warn("[notify] SMTP not configured. Would send download email to:", toEmail);
			return res.status(200).json({ ok: true, simulated: true });
		}

		await transporter.sendMail({
			from: process.env.SMTP_FROM || `"Xpoint Notifications" <${process.env.SMTP_USER}>`,
			to: toEmail,
			subject,
			text,
			html
		});

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("[notify] download error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

// Waitlist email notification
router.post("/waitlist", async (req, res) => {
	try {
		const email = String(req.body?.email || "").trim();
		const emailOk = /^\S+@\S+\.\S+$/.test(email);
		if (!emailOk) {
			return res.status(400).json({ error: "Valid email is required" });
		}

		const toEmail = process.env.NOTIFY_TO_EMAIL || "contact@xpointweb.com";
		const transporter = createTransport();

		const subject = `Waitlist – New signup`;
		const text = `A new user joined the waitlist.

Email: ${email}
`;
		const html = `<h2>New Waitlist signup</h2>
<p><strong>Email:</strong> ${email}</p>`;

		if (!transporter) {
			console.warn("[notify] SMTP not configured. Would send waitlist email to:", toEmail);
			return res.status(200).json({ ok: true, simulated: true });
		}

		await transporter.sendMail({
			from: process.env.SMTP_FROM || `"Xpoint Notifications" <${process.env.SMTP_USER}>`,
			to: toEmail,
			subject,
			text,
			html
		});

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error("[notify] waitlist error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});


