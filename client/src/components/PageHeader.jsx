import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle }) {
	return (
		<section className="gradient-hero border-b border-slate-200">
			<div className="container-padded py-10 md:py-14">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-3xl md:text-4xl font-black text-midnight">{title}</h1>
					{subtitle ? (
						<motion.p
							className="mt-2 text-midnight/70"
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							{subtitle}
						</motion.p>
					) : null}
				</motion.div>
			</div>
		</section>
	);
}


