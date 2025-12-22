import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";

export default function DeleteAccount() {
	const listContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
	const listItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

	return (
		<>
			<PageHeader title="Delete Account" subtitle="Manage your data and deletion requests" />
			<section className="container-padded py-10 md:py-16">
				<motion.div
					className="card p-6 md:p-8 prose prose-slate max-w-none prose-justify max-w-3xl mx-auto space-y-6 divide-y divide-slate-200"
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.5 }}
				>
					<div className="bg-gradient-to-r from-primary-300/60 to-cyan-300/60 h-1 rounded-full mb-2"></div>
					<h1 className="text-3xl font-black text-midnight">Delete Account – Xpoint</h1>
					<p>
						Xpoint respects user privacy and provides users with full control over their personal data.
					</p>

					<h3 className="mt-6 text-xl font-bold text-midnight">How to request account deletion</h3>
					<p>
						To request deletion of your Xpoint account and associated data, please send an email from your registered email address or phone number to:
					</p>
					<p>
						<a href="mailto:contact@xpointweb.com" className="text-primary-600 hover:underline">contact@xpointweb.com</a>
					</p>
					<p>
						Use the subject line: <span className="font-semibold">Account Deletion Request – Xpoint</span>
					</p>

					<h3 className="mt-6 text-xl font-bold text-midnight">What data will be deleted</h3>
					<p>Upon successful verification, Xpoint will permanently delete the following data associated with your account:</p>
					<motion.ul
						variants={listContainer}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
					>
						<motion.li variants={listItem}>User account and profile information</motion.li>
						<motion.li variants={listItem}>Registered phone number and contact details</motion.li>
						<motion.li variants={listItem}>Uploaded documents for printing</motion.li>
						<motion.li variants={listItem}>Order history linked to the account</motion.li>
					</motion.ul>

					<h3 className="mt-6 text-xl font-bold text-midnight">Data retention</h3>
					<p>
						Certain transactional records, such as invoices or payment references, may be retained for a limited period as required by applicable laws or regulatory obligations. These records are retained strictly for compliance purposes and are not used for marketing or profiling.
					</p>

					<h3 className="mt-6 text-xl font-bold text-midnight">Processing time</h3>
					<p>
						Account deletion requests are processed within <span className="font-semibold">7–14 working days</span> after verification.
					</p>

					<h3 className="mt-6 text-xl font-bold text-midnight">Contact</h3>
					<p>
						For any questions or clarifications, please contact us at <a href="mailto:contact@xpointweb.com" className="text-primary-600 hover:underline">contact@xpointweb.com</a>.
					</p>
				</motion.div>
			</section>
		</>
	);
}


