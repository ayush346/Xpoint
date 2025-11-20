import { Router } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveInstallerPath() {
	// 1) Allow explicit override via env
	const envPath = process.env.INSTALLER_PATH;
	if (envPath && fs.existsSync(envPath)) {
		return envPath;
	}
	// 2) Check typical locations within repo
	const candidates = [
		path.resolve(__dirname, "../../assets/XPOINTSetup.exe"),
		path.resolve(__dirname, "../../../client/public/XPOINTSetup.exe"),
		path.resolve(__dirname, "../../../client/dist/XPOINTSetup.exe"),
	];
	for (const candidate of candidates) {
		if (fs.existsSync(candidate)) return candidate;
	}
	return null;
}

router.get("/installer", (req, res) => {
	const installerPath = resolveInstallerPath();
	if (!installerPath) {
		return res.status(404).json({ error: "Installer not found on server." });
	}
	try {
		const stat = fs.statSync(installerPath);
		const filename = "XPOINTSetup.exe";
		res.setHeader("Content-Type", "application/octet-stream");
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
		res.setHeader("Content-Length", String(stat.size));
		res.setHeader("Accept-Ranges", "bytes");
		// Avoid proxies transforming the payload
		res.setHeader("Cache-Control", "no-store, no-transform");

		const fileStream = fs.createReadStream(installerPath);
		fileStream.on("error", () => {
			if (!res.headersSent) {
				res.status(500).json({ error: "Failed to read installer." });
			} else {
				res.destroy();
			}
		});
		fileStream.pipe(res);
	} catch (_err) {
		return res.status(500).json({ error: "Failed to send installer." });
	}
});

export default router;


