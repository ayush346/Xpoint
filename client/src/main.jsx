import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import TermsPrivacy from "./pages/TermsPrivacy.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";
import "./index.css";
import { setupGlobalWave } from "./utils/wave.js";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

setupGlobalWave();
createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/terms-policies" element={<TermsPrivacy />} />
					<Route path="/terms-privacy" element={<Navigate to="/terms-policies" replace />} />
					<Route path="/delete-account" element={<DeleteAccount />} />
				</Routes>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);


