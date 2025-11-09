import { motion, AnimatePresence } from "framer-motion";

export default function AlertModal({ open, onClose, title = "Success", message = "Our team will reach you soon. Thank you for your interest." }) {
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
						className="relative z-10 w-[92%] max-w-md card p-6 md:p-8 text-center"
					>
						<h3 className="text-xl md:text-2xl font-bold text-midnight">{title}</h3>
						<p className="mt-3 text-midnight/80">{message}</p>
						<div className="mt-6">
							<button onClick={onClose} className="btn-primary px-6">Okay</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}



