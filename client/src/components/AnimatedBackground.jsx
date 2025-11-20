import { motion } from "framer-motion";

export default function AnimatedBackground() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<motion.span
				className="absolute -top-10 -left-10 h-64 w-64 rounded-full blur-3xl"
				style={{ background: "radial-gradient(closest-side, rgba(14,165,233,.35), transparent)" }}
				animate={{ x: [0, 40, -20, 0], y: [0, -20, 20, 0] }}
				transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.span
				className="absolute top-10 right-10 h-72 w-72 rounded-full blur-3xl"
				style={{ background: "radial-gradient(closest-side, rgba(2,132,199,.25), transparent)" }}
				animate={{ x: [0, -30, 30, 0], y: [0, 10, -10, 0] }}
				transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.span
				className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-3xl"
				style={{ background: "radial-gradient(closest-side, rgba(59,130,246,.18), transparent)" }}
				animate={{ y: [0, -15, 10, 0] }}
				transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
			/>
		</div>
	);
}





