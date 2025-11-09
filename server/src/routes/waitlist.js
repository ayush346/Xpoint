import { Router } from "express";
import Waitlist from "../models/Waitlist.js";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { email, source } = req.body || {};
		if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
			return res.status(400).json({ error: "Valid email is required" });
		}

		// Only persist if DB connected; otherwise, accept without storing
		if (req.appState?.isDatabaseConnected) {
			// Upsert to avoid duplicates
			await Waitlist.updateOne(
				{ email: email.toLowerCase().trim() },
				{ $setOnInsert: { email: email.toLowerCase().trim(), source: source || "website" } },
				{ upsert: true }
			);
		}

		return res.status(201).json({ ok: true });
	} catch (err) {
		console.error("[waitlist] POST / error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

export default router;



