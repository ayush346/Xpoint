import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";
import { payoutGet, payoutPost, UnauthorizedError } from "../payout/payoutApi.js";
import { downloadPayoutPdf } from "../payout/payoutPdf.js";

export default function PayoutDetail() {
	const { payoutId } = useParams();
	const navigate = useNavigate();

	const [detail, setDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [reference, setReference] = useState("");
	const [marking, setMarking] = useState(false);

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const data = await payoutGet(`/api/admin/payouts/${payoutId}`);
			setDetail(data);
		} catch (err) {
			if (err instanceof UnauthorizedError) {
				navigate("/admin/payouts/login", { replace: true });
				return;
			}
			setError("Couldn't load this payout.");
		} finally {
			setLoading(false);
		}
	}, [payoutId, navigate]);

	useEffect(() => {
		load();
	}, [load]);

	async function handleMarkPaid(e) {
		e.preventDefault();
		if (!reference.trim()) return;
		setMarking(true);
		setError("");
		try {
			await payoutPost(`/api/admin/payouts/${payoutId}/mark-paid`, { paidReference: reference.trim() });
			await load();
		} catch (err) {
			if (err instanceof UnauthorizedError) {
				navigate("/admin/payouts/login", { replace: true });
				return;
			}
			setError("Couldn't mark this payout as paid.");
		} finally {
			setMarking(false);
		}
	}

	function handleDownload() {
		setError("");
		try {
			downloadPayoutPdf(detail);
		} catch {
			setError("Couldn't generate the statement PDF.");
		}
	}

	return (
		<>
			<PageHeader title={detail?.shopName || "Payout Detail"} subtitle={detail ? `Settlement for ${detail.settlementDate}` : "Loading…"} />
			<section className="container-padded py-10 md:py-16">
				<Link to="/admin/payouts" className="text-sm text-primary-600 hover:underline">← Back to all payouts</Link>

				{loading ? (
					<p className="mt-6 text-midnight/50">Loading…</p>
				) : !detail ? (
					<p className="mt-6 text-red-600">{error || "Payout not found."}</p>
				) : (
					<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6 space-y-6">
						{error ? <p className="text-sm text-red-600">{error}</p> : null}

						<div className="grid md:grid-cols-2 gap-6">
							<div className="card p-6">
								<h3 className="text-sm font-semibold text-midnight/50 uppercase tracking-wide mb-3">Payout</h3>
								<dl className="space-y-2 text-sm">
									<div className="flex justify-between"><dt className="text-midnight/60">Orders</dt><dd className="tabular-nums font-medium">{detail.orders.length}</dd></div>
									<div className="flex justify-between"><dt className="text-midnight/60">Total amount</dt><dd className="tabular-nums font-semibold">₹{detail.totalAmount.toFixed(2)}</dd></div>
									<div className="flex justify-between"><dt className="text-midnight/60">Status</dt><dd className="font-medium">{detail.status}</dd></div>
									{detail.paidReference ? (
										<div className="flex justify-between"><dt className="text-midnight/60">Reference</dt><dd className="font-mono text-xs">{detail.paidReference}</dd></div>
									) : null}
								</dl>
							</div>

							<div className="card p-6">
								<h3 className="text-sm font-semibold text-midnight/50 uppercase tracking-wide mb-3">Pay to</h3>
								{detail.bankDetails ? (
									<dl className="space-y-2 text-sm">
										<div className="flex justify-between"><dt className="text-midnight/60">Name</dt><dd className="font-medium">{detail.bankDetails.accountHolderName}</dd></div>
										{detail.bankDetails.upiId ? (
											<div className="flex justify-between"><dt className="text-midnight/60">UPI</dt><dd className="font-mono text-xs">{detail.bankDetails.upiId}</dd></div>
										) : (
											<>
												<div className="flex justify-between"><dt className="text-midnight/60">Account</dt><dd className="font-mono text-xs">{detail.bankDetails.accountNumber}</dd></div>
												<div className="flex justify-between"><dt className="text-midnight/60">IFSC</dt><dd className="font-mono text-xs">{detail.bankDetails.ifsc}</dd></div>
											</>
										)}
									</dl>
								) : (
									<p className="text-sm text-red-600">No bank details on file for this shop yet.</p>
								)}
							</div>
						</div>

						<div className="card overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-midnight/50">
										<th className="px-4 py-3 font-semibold">Order</th>
										<th className="px-4 py-3 font-semibold">Collected</th>
										<th className="px-4 py-3 font-semibold text-right">Sheets</th>
										<th className="px-4 py-3 font-semibold text-right">Amount</th>
									</tr>
								</thead>
								<tbody>
									{detail.orders.map((o) => (
										<tr key={o.printPayloadId} className="border-b border-slate-100 last:border-0">
											<td className="px-4 py-3 font-mono text-xs">{o.orderId}</td>
											<td className="px-4 py-3 text-midnight/70">{new Date(o.collectedAt).toLocaleDateString()}</td>
											<td className="px-4 py-3 text-right tabular-nums">{o.totalSheets}</td>
											<td className="px-4 py-3 text-right tabular-nums">₹{o.totalAmount.toFixed(2)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 sm:items-end">
							<button onClick={handleDownload} className="btn-secondary">
								Download PDF
							</button>

							{detail.status === "PENDING" ? (
								<form onSubmit={handleMarkPaid} className="flex flex-col sm:flex-row gap-3 flex-1">
									<input
										type="text"
										placeholder="UTR / reference number"
										value={reference}
										onChange={(e) => setReference(e.target.value)}
										className="flex-1 rounded-lg border border-slate-300/80 bg-white px-3 py-2.5 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
										required
									/>
									<button type="submit" disabled={marking} className="btn-solid-blue disabled:opacity-60 whitespace-nowrap">
										{marking ? "Saving…" : "Mark as Paid"}
									</button>
								</form>
							) : null}
						</div>
					</motion.div>
				)}
			</section>
		</>
	);
}
