import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";
import { payoutGet, payoutPost, UnauthorizedError } from "../payout/payoutApi.js";

const STATUS_STYLES = {
	PENDING: "bg-amber-100 text-amber-700",
	PAID: "bg-emerald-100 text-emerald-700",
	FAILED: "bg-red-100 text-red-700",
};

function StatusPill({ status }) {
	return (
		<span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
			<span className="w-1.5 h-1.5 rounded-full bg-current" />
			{status}
		</span>
	);
}

export default function PayoutsOverview() {
	const navigate = useNavigate();
	const [payouts, setPayouts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [generating, setGenerating] = useState(false);
	const [error, setError] = useState("");
	const [filter, setFilter] = useState("");

	const load = useCallback(async (status) => {
		setLoading(true);
		setError("");
		try {
			const data = await payoutGet("/api/admin/payouts", { params: status ? { status } : {} });
			setPayouts(data);
		} catch (err) {
			if (err instanceof UnauthorizedError) {
				navigate("/admin/payouts/login", { replace: true });
				return;
			}
			setError("Couldn't load payouts. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [navigate]);

	useEffect(() => {
		load(filter);
	}, [load, filter]);

	async function handleGenerate() {
		setGenerating(true);
		setError("");
		try {
			await payoutPost("/api/admin/payouts/generate");
			await load(filter);
		} catch (err) {
			if (err instanceof UnauthorizedError) {
				navigate("/admin/payouts/login", { replace: true });
				return;
			}
			setError("Couldn't generate today's payouts.");
		} finally {
			setGenerating(false);
		}
	}

	const totalPending = payouts
		.filter((p) => p.status === "PENDING")
		.reduce((sum, p) => sum + p.totalAmount, 0);

	return (
		<>
			<PageHeader title="Shop Payouts" subtitle="Settlement batches across all partnered print shops" />
			<section className="container-padded py-10 md:py-16">
				<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<div className="flex items-center gap-2">
							{["", "PENDING", "PAID", "FAILED"].map((s) => (
								<button
									key={s || "ALL"}
									onClick={() => setFilter(s)}
									className={`rounded-lg px-3 py-1.5 text-sm font-medium border transition-colors ${
										filter === s
											? "bg-midnight text-white border-midnight"
											: "bg-white text-midnight/70 border-slate-300/80 hover:border-slate-400"
									}`}
								>
									{s || "All"}
								</button>
							))}
						</div>
						<button onClick={handleGenerate} disabled={generating} className="btn-solid-blue disabled:opacity-60">
							{generating ? "Generating…" : "Generate Today's Payouts"}
						</button>
					</div>

					{filter === "" || filter === "PENDING" ? (
						<p className="text-sm text-midnight/60 mb-4">
							Pending total: <span className="font-semibold text-midnight">₹{totalPending.toFixed(2)}</span>
						</p>
					) : null}

					{error ? <p className="text-sm text-red-600 mb-4">{error}</p> : null}

					<div className="card overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-midnight/50">
									<th className="px-4 py-3 font-semibold">Shop</th>
									<th className="px-4 py-3 font-semibold">Orders</th>
									<th className="px-4 py-3 font-semibold">Date</th>
									<th className="px-4 py-3 font-semibold text-right">Amount</th>
									<th className="px-4 py-3 font-semibold">Status</th>
									<th className="px-4 py-3"></th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan={6} className="px-4 py-8 text-center text-midnight/50">Loading…</td>
									</tr>
								) : payouts.length === 0 ? (
									<tr>
										<td colSpan={6} className="px-4 py-8 text-center text-midnight/50">No payouts found.</td>
									</tr>
								) : (
									payouts.map((p) => (
										<tr key={p.payoutId} className="border-b border-slate-100 last:border-0 hover:bg-soft/60">
											<td className="px-4 py-3 font-medium text-midnight">{p.shopName || `Shop #${p.shopId}`}</td>
											<td className="px-4 py-3 tabular-nums">{p.totalOrders}</td>
											<td className="px-4 py-3 tabular-nums">{p.settlementDate}</td>
											<td className="px-4 py-3 text-right tabular-nums">₹{p.totalAmount.toFixed(2)}</td>
											<td className="px-4 py-3"><StatusPill status={p.status} /></td>
											<td className="px-4 py-3 text-right">
												<Link to={`/admin/payouts/${p.payoutId}`} className="text-primary-600 hover:underline font-medium">
													View
												</Link>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</motion.div>
			</section>
		</>
	);
}
