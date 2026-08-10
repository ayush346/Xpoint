import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { post as apiPost } from "../utils/api.js";
import { extractUserMessage } from "../utils/error.js";

const COUNTRY_CODES = [
	{ code: "+1", label: "United States / Canada" },
	{ code: "+44", label: "United Kingdom" },
	{ code: "+61", label: "Australia" },
	{ code: "+91", label: "India" },
	{ code: "+971", label: "United Arab Emirates" }
];

export default function PartnerModal({ open, onClose, onSuccess }) {
	const [fullName, setFullName] = useState("");
	const [countryCode, setCountryCode] = useState("+91");
	const [phone, setPhone] = useState("");
	const [country, setCountry] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e?.preventDefault();
		setMessage("");
		if (!fullName.trim() || !phone.trim() || !country.trim() || !email.trim() || !address.trim()) {
			setMessage("Please fill all fields.");
			return;
		}
		try {
			setSubmitting(true);
			await apiPost("/api/notify/partner", {
				fullName, countryCode, phone, country, email, address
			});
			setFullName(""); setPhone(""); setCountry(""); setEmail(""); setAddress("");
			onClose?.();
			onSuccess?.("Our team will reach you soon. Thank you for your interest.");
		} catch (err) {
			setMessage(extractUserMessage(err, "Something went wrong. Please try again."));
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<AnimatePresence>
			{open && (
				<motion.div className="fixed inset-0 z-50 flex items-center justify-center"
					initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
					<motion.div
						initial={{ y: 20, opacity: 0, scale: 0.98 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 10, opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="relative z-10 w-[92%] max-w-lg card bg-white/30 p-6 md:p-8"
					>
						<div className="flex items-center justify-between">
							<h3 className="text-xl md:text-2xl font-bold text-midnight">Partner With Us</h3>
							<button onClick={onClose} className="btn-secondary px-3 py-2">Close</button>
						</div>
						<form onSubmit={handleSubmit} className="mt-5 grid gap-4">
							<input
								type="text"
								placeholder="Full name"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<div className="grid grid-cols-3 gap-3">
								<select
									value={countryCode}
									onChange={(e) => setCountryCode(e.target.value)}
									className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight focus:outline-none focus:ring-2 focus:ring-primary-300"
								>
									{COUNTRY_CODES.map(opt => (
										<option key={opt.code} value={opt.code}>{opt.code} — {opt.label}</option>
									))}
								</select>
								<input
									type="tel"
									placeholder="Contact number"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="col-span-2 w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
								/>
							</div>
							<input
								type="text"
								placeholder="Country name"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<textarea
								rows={4}
								placeholder="Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className="w-full rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<div className="flex items-center gap-3">
								<button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
									{submitting ? "Submitting..." : "Submit"}
								</button>
								{message && <div className="text-sm text-midnight/70">{String(message)}</div>}
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}


