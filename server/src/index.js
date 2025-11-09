import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import contentRouter from "./routes/content.js";
import waitlistRouter from "./routes/waitlist.js";
import notifyRouter from "./routes/notify.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

let isDatabaseConnected = false;

async function connectToDatabase() {
	// Connect only if URI provided; otherwise, run in memory-only mode
	if (!mongoUri) {
		console.warn("[server] No MONGODB_URI provided; running without database.");
		return;
	}
	try {
		await mongoose.connect(mongoUri, {
			// useNewUrlParser/useUnifiedTopology no longer needed in Mongoose 6+
		});
		isDatabaseConnected = true;
		console.log("[server] Connected to MongoDB");
	} catch (err) {
		console.error("[server] MongoDB connection failed:", err.message);
		console.warn("[server] Continuing without database (in-memory only).");
	}
}

await connectToDatabase();

// Inject connection state into request
app.use((req, _res, next) => {
	req.appState = { isDatabaseConnected };
	next();
});

app.use("/api/content", contentRouter);
app.use("/api/waitlist", waitlistRouter);
app.use("/api/notify", notifyRouter);

// Serve client build in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

if (process.env.NODE_ENV === "production") {
	app.use(express.static(clientDistPath));
	app.get("*", (_req, res) => {
		res.sendFile(path.join(clientDistPath, "index.html"));
	});
}

app.listen(port, () => {
	console.log(`[server] Listening on http://localhost:${port}`);
});


