import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground.jsx";

export default function Hero({ onOpenEarlyAccess, onOpenPartner, onOpenDownload }) {
	return (
		<section className="relative overflow-hidden gradient-hero border-b border-slate-200">
			<AnimatedBackground />
			<div className="container-padded py-20 md:py-28">
				<motion.h1
					className="text-4xl md:text-6xl font-black tracking-tight text-midnight"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<span className="bg-gradient-to-r from-primary-500 via-primary-700 to-primary-500 bg-clip-text text-transparent animate-shimmer">
						Skip the Wait, Own the Moment.
					</span>
				</motion.h1>
				<motion.p
					className="mt-5 max-w-2xl text-lg md:text-xl text-midnight/70"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					Your campus life deserves speed — print in seconds and spend more time where it matters: with your friends, your goals, and your memories.
				</motion.p>
				<motion.div
					className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<button type="button" onClick={onOpenEarlyAccess} className="btn-primary w-full sm:w-auto">Get Early Access</button>
					<a href="https://xpoint-uploads-prod.s3.ap-south-1.amazonaws.com/XpointDesktopApp/XPOINT+Setup+1.0.11.exe" download className="btn-solid-yellow w-full sm:w-auto text-center">Download for Desktop</a>
				</motion.div>
			</div>
		</section>
	);
}


