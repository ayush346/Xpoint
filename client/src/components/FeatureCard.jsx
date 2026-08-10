import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, text, delay = 0 }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			whileHover={{ y: -6, scale: 1.02 }}
			whileTap={{ scale: 0.99 }}
			viewport={{ once: true, amount: 0.4 }}
			transition={{ duration: 0.5, delay }}
			className="card p-6 transition-transform duration-300"
		>
			<div className="text-2xl">{icon}</div>
			<h4 className="mt-2 text-lg font-bold text-midnight">{title}</h4>
			<p className="mt-2 text-midnight/80">{text}</p>
		</motion.div>
	);
}


