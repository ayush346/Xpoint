import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import TermsPrivacy from "./pages/TermsPrivacy.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./index.css";
import { setupGlobalWave } from "./utils/wave.js";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

setupGlobalWave();
const Router = import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;
createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<App />} />
						<Route path="terms-policies" element={<TermsPrivacy />} />
						<Route path="terms-privacy" element={<Navigate to="/terms-policies" replace />} />
						<Route path="delete-account" element={<DeleteAccount />} />
					</Route>
				</Routes>
			</Router>
		</ErrorBoundary>
	</React.StrictMode>
);


