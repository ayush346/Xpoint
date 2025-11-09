import { motion } from "framer-motion";

export default function Section({ index, heading, body }) {
	return (
		<motion.article
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
			className="card p-6 md:p-8"
		>
			<h3 className="text-xl md:text-2xl font-bold text-midnight">
				{heading}
			</h3>
			<p className="mt-3 whitespace-pre-wrap leading-relaxed text-midnight/80">
				{body}
			</p>
		</motion.article>
	);
}



