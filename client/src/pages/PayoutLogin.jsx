import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";
import { buildAuthHeader, setStoredAuthHeader } from "../payout/payoutAuth.js";
import { payoutGet } from "../payout/payoutApi.js";

export default function PayoutLogin() {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from || "/admin/payouts";

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!username.trim() || !password) return;

		setLoading(true);
		setError("");
		const authHeader = buildAuthHeader(username.trim(), password);

		try {
			// verify the credentials actually work before trusting them
			setStoredAuthHeader(authHeader);
			await payoutGet("/api/admin/payouts");
			navigate(from, { replace: true });
		} catch {
			setStoredAuthHeader("");
			setError("Invalid username or password.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<PageHeader title="Shop Payouts" subtitle="Internal tool — team access only" />
			<section className="container-padded py-10 md:py-16">
				<motion.div
					className="card p-6 md:p-8 max-w-sm mx-auto"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				>
					<h1 className="text-xl font-bold text-midnight mb-1">Admin Login</h1>
					<p className="text-sm text-midnight/60 mb-6">Sign in to manage shop settlements.</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-midnight/80 mb-1">Username</label>
							<input
								type="text"
								autoComplete="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-2.5 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-midnight/80 mb-1">Password</label>
							<input
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-2.5 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
								required
							/>
						</div>

						{error ? <p className="text-sm text-red-600">{error}</p> : null}

						<button type="submit" disabled={loading} className="btn-solid-blue w-full justify-center disabled:opacity-60">
							{loading ? "Signing in…" : "Sign In"}
						</button>
					</form>
				</motion.div>
			</section>
		</>
	);
}
