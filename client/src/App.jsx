import { useState } from "react";
import { motion } from "framer-motion";
import { post as apiPost } from "./utils/api.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import EarlyAccessModal from "./components/EarlyAccessModal.jsx";
import PartnerModal from "./components/PartnerModal.jsx";
import FeatureCard from "./components/FeatureCard.jsx";
import DownloadModal from "./components/DownloadModal.jsx";
import AlertModal from "./components/AlertModal.jsx";

export default function App() {
	const [showEarlyAccess, setShowEarlyAccess] = useState(false);
	const [showPartner, setShowPartner] = useState(false);
	const [showDownload, setShowDownload] = useState(false);
	const [email, setEmail] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("Our team will reach you soon. Thank you for your interest.");
	const [waitlistStatus, setWaitlistStatus] = useState("");

	async function joinWaitlist(e) {
		e?.preventDefault();
		if (!email.trim()) return;
		try {
			setWaitlistStatus("Submitting...");
			await apiPost("/api/notify/waitlist", { email });
			setWaitlistStatus("You're on the list! 🎉");
			setEmail("");
		} catch {
			setWaitlistStatus("Something went wrong. Please try again.");
		}
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1">
				<Hero onOpenEarlyAccess={() => setShowEarlyAccess(true)} onOpenPartner={() => setShowPartner(true)} onOpenDownload={() => setShowDownload(true)} />

				<section id="features" className="container-padded py-12 md:py-16">
					<div className="mb-6 md:mb-8">
						<h2 className="text-3xl font-black text-midnight">Printouts, Simplified!</h2>
					</div>
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
						variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
						className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
					>
						<FeatureCard icon="📍" title="Find Shops" text="Discover trusted print shops near your campus." delay={0.0} />
						<FeatureCard icon="📤" title="Upload Docs" text="Upload documents directly from your phone — anytime, anywhere." delay={0.06} />
						<FeatureCard icon="🛠️" title="Customize" text="Set print preferences, copies, paper type, and add‑ons easily." delay={0.12} />
						<FeatureCard icon="💳" title="Pay & Track" text="Pay securely and track your order in real time." delay={0.18} />
					</motion.div>
				</section>

				<section id="waitlist" className="bg-soft border-y border-slate-200">
					<div className="container-padded py-12 md:py-16 grid md:grid-cols-2 gap-6">
						<div className="space-y-3">
							<h3 className="text-3xl font-black text-midnight">Be Among the First</h3>
							<p className="text-midnight/80">Join our exclusive waitlist and be part of the early access program. Get special discounts and early bird rewards when we launch!</p>
							<p className="text-midnight/70 text-sm">📈 500+ Students Already Interested • 🎁 Early birds get 50% off their first 5 orders</p>
						</div>
						<form onSubmit={joinWaitlist} className="card p-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
							<input
								type="email"
								required
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full sm:flex-1 rounded-lg border border-slate-300/80 bg-white px-3 py-3 text-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
							/>
							<button type="submit" className="btn-primary w-full sm:w-auto">Join Waitlist</button>
							{waitlistStatus && <div className="text-sm text-midnight/70 mt-2 sm:mt-0 sm:ml-2">{waitlistStatus}</div>}
						</form>
					</div>
				</section>

				<section id="benefits" className="container-padded py-12 md:py-16">
					<h3 className="text-3xl font-black text-midnight">How Xpoint Enhances Student Life</h3>
					<p className="mt-2 text-midnight/70">We’re not just about printing — we’re about giving you back your time.</p>
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
						variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
						className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6"
					>
						{[
							"🕒 Save 60+ Minutes Daily",
							"💳 100% Secure Payments",
							"📄 Quality Guaranteed",
							"🎓 Student-Friendly Pricing",
							"🧍‍♀️ No More Queues",
							"🎯 More Time for Goals & Friends",
							"🏠 Order from Anywhere!",
							"📦 Pickup When Ready",
							"🎁 Exclusive Student Offers",
							"🔐 Safe & Secure",
							"🏪 Verified Print Partners"
						].map((b, i) => (
							<motion.div
								key={b}
								initial={{ opacity: 0, y: 12, scale: 0.98 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.2) }}
								className="card p-4"
							>
								<div className="text-midnight font-semibold">{b}</div>
							</motion.div>
						))}
					</motion.div>
				</section>

				<section id="partners" className="bg-soft border-t border-slate-200">
					<div className="container-padded py-12 md:py-16 grid md:grid-cols-2 gap-6 items-start">
						<div>
							<h3 className="text-3xl font-black text-midnight">Partner With Us</h3>
							<p className="mt-2 text-midnight/80">Join the growing Xpoint network and help make campus life smoother.</p>
							<ul className="mt-4 list-disc list-inside text-midnight/80 space-y-1">
								<li>Receive direct digital orders.</li>
								<li>Manage printing queue efficiently.</li>
								<li>Offer students a next‑gen experience.</li>
								<li>Earn visibility through the Xpoint platform.</li>
							</ul>
							<div className="mt-6 flex items-center gap-3">
								<button type="button" onClick={() => setShowDownload(true)} className="btn-secondary w-full sm:w-auto">Schedule a Demo</button>
							</div>
						</div>
						<div className="card p-6">
							<h4 className="text-lg font-bold text-midnight">Why partner with Xpoint?</h4>
							<p className="mt-2 text-midnight/80">Access a large student audience, streamline operations, and grow your business with digital workflows.</p>
						</div>
					</div>
				</section>
			</main>

			<EarlyAccessModal
				open={showEarlyAccess}
				onClose={() => setShowEarlyAccess(false)}
				onSuccess={(msg) => { setAlertMessage(msg || "Our team will reach you soon. Thank you for your interest."); setShowAlert(true); }}
			/>
			<PartnerModal
				open={showPartner}
				onClose={() => setShowPartner(false)}
				onSuccess={(msg) => { setAlertMessage(msg || "Our team will reach you soon. Thank you for your interest."); setShowAlert(true); }}
			/>
			<DownloadModal
				open={showDownload}
				onClose={() => setShowDownload(false)}
				onSuccess={(msg) => { setAlertMessage(msg || "Our team will reach you soon. Thank you for your interest."); setShowAlert(true); }}
			/>
			<AlertModal open={showAlert} onClose={() => setShowAlert(false)} message={alertMessage} />

			<footer className="border-t border-slate-200">
				<div id="contact" className="container-padded py-8 text-sm text-midnight/80">
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="text-midnight font-bold text-base">Contact Us</h4>
							<ul className="mt-3 space-y-1">
								<li>
									<span className="font-medium">Surya K (Founder): </span>
									<a className="text-primary-600 hover:underline" href="tel:+918073029928">+91 8073029928</a>
								</li>
								<li>
									<span className="font-medium">Ayush B C (COO): </span>
									<a className="text-primary-600 hover:underline" href="tel:+917204242741">+91 7204242741</a>
								</li>
								<li className="pt-1">
									<span className="font-medium">Email: </span>
									<a className="text-primary-600 hover:underline" href="mailto:contact@xpointweb.com">contact@xpointweb.com</a>
								</li>
							</ul>
						</div>
						<div className="text-center md:text-right md:block mt-4 md:mt-0">
							<div className="text-midnight/60">©2025 Xpoint pvt ltd. All Rights Reserved</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}


