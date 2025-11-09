import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { post as apiPost } from "../utils/api.js";

export default function EarlyAccessModal({ open, onClose, onSuccess }) {
	const [fullName, setFullName] = useState("");
	const [role, setRole] = useState("student");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e?.preventDefault();
		setMessage("");
		if (!fullName.trim() || !email.trim() || !phone.trim()) {
			setMessage("Please fill all fields.");
			return;
		}
		try {
			setSubmitting(true);
			await apiPost("/api/notify/early-access", { fullName, role, phone, email });
			setFullName(""); setPhone(""); setEmail("");
			onClose?.();
			onSuccess?.("Our team will reach you soon. Thank you for your interest.");
		} catch (err) {
			setMessage(err?.response?.data?.error || "Something went wrong. Please try again.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
					<motion.div
						initial={{ y: 20, opacity: 0, scale: 0.98 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 10, opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="relative z-10 w-[92%] max-w-lg card bg-white/30 p-6 md:p-8"
					>
						<div className="flex items-center justify-between">
							<h3 className="text-xl md:text-2xl font-bold text-midnight">Get Early Access</h3>
							<button onClick={onClose} className="btn-secondary px-3 py-2">Close</button>
						</div>
						<p className="mt-2 text-sm text-midnight/70">Tell us about you and we’ll reach out. An email will be sent to contact@xpointweb.com.</p>
						<form onSubmit={handleSubmit} className="mt-5 grid gap-4">
							<input
								type="text"
								placeholder="Full name"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<div className="grid grid-cols-2 gap-3">
								<select
									value={role}
									onChange={(e) => setRole(e.target.value)}
									className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight focus:outline-none focus:ring-2 focus:ring-primary-300"
								>
									<option value="student">Student</option>
									<option value="vendor">Vendor</option>
								</select>
								<input
									type="tel"
									placeholder="Contact number"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
								/>
							</div>
							<input
								type="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<div className="flex items-center gap-3">
								<button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
									{submitting ? "Submitting..." : "Submit"}
								</button>
								{message && <div className="text-sm text-midnight/70">{message}</div>}
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}


