import { Router } from "express";
import Content from "../models/Content.js";
import { parseTextToStructuredContent } from "../utils/parseText.js";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { text, title } = req.body || {};
		if (!text || typeof text !== "string") {
			return res.status(400).json({ error: "Missing 'text' in request body" });
		}

		const parsed = parseTextToStructuredContent(text, title || "Your Website");

		// Save only if database is connected
		if (req.appState?.isDatabaseConnected) {
			const saved = await Content.create(parsed);
			return res.status(201).json({ id: saved._id.toString(), ...parsed });
		}

		// In-memory mode: just return parsed
		return res.status(201).json(parsed);
	} catch (err) {
		console.error("[content] POST / error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

router.get("/latest", async (_req, res) => {
	try {
		if (!_req.appState?.isDatabaseConnected) {
			return res.status(200).json(null);
		}
		const latest = await Content.findOne().sort({ createdAt: -1 }).lean();
		return res.status(200).json(latest || null);
	} catch (err) {
		console.error("[content] GET /latest error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		if (!req.appState?.isDatabaseConnected) {
			return res.status(404).json({ error: "Not found" });
		}
		const { id } = req.params;
		const found = await Content.findById(id).lean();
		if (!found) return res.status(404).json({ error: "Not found" });
		return res.status(200).json(found);
	} catch (err) {
		console.error("[content] GET /:id error:", err);
		return res.status(500).json({ error: "Server error" });
	}
});

export default router;






