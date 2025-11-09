import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	function closeMenu() {
		setOpen(false);
	}

	return (
		<header className="sticky top-0 z-30 bg-white/75 backdrop-blur border-b border-slate-200">
			<div className="container-padded flex items-center justify-between py-4">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex items-center gap-3"
				>
					<img
						src="/xpoint-logo.png.jpeg"
						alt="Xpoint"
						className="h-9 w-9 rounded-xl object-cover shadow-glow"
					/>
					<div className="font-extrabold text-lg tracking-tight text-midnight">Xpoint</div>
				</motion.div>
				<nav className="hidden md:flex items-center gap-6 text-sm font-medium text-midnight/80">
					<a href="#features" className="hover:text-primary-500 transition-colors">Features</a>
					<a href="#waitlist" className="hover:text-primary-500 transition-colors">Waitlist</a>
					<a href="#partners" className="hover:text-primary-500 transition-colors">Partners</a>
					<a href="#contact" className="hover:text-primary-500 transition-colors">Contact Us</a>
				</nav>
				<button
					type="button"
					aria-label="Open menu"
					className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-300/70 text-midnight/80"
					onClick={() => setOpen(v => !v)}
				>
					<span className="sr-only">Menu</span>
					<div className="flex flex-col gap-1.5">
						<span className="block h-0.5 w-5 bg-current rounded" />
						<span className="block h-0.5 w-5 bg-current rounded" />
						<span className="block h-0.5 w-5 bg-current rounded" />
					</div>
				</button>
			</div>
			{/* Mobile menu */}
			{open && (
				<motion.nav
					initial={{ opacity: 0, y: -6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -6 }}
					className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur"
				>
					<div className="container-padded py-3 flex flex-col gap-3 text-sm font-medium text-midnight/90">
						<a onClick={closeMenu} href="#features" className="hover:text-primary-500">Features</a>
						<a onClick={closeMenu} href="#waitlist" className="hover:text-primary-500">Waitlist</a>
						<a onClick={closeMenu} href="#partners" className="hover:text-primary-500">Partners</a>
						<a onClick={closeMenu} href="#contact" className="hover:text-primary-500">Contact Us</a>
					</div>
				</motion.nav>
			)}
		</header>
	);
}


