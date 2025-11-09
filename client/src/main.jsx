import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setupGlobalWave } from "./utils/wave.js";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

setupGlobalWave();
createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);


