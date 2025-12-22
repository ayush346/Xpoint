export default function Footer() {
	return (
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
						<div className="mt-2">
							<a href="/terms-policies" className="text-primary-600 hover:underline">Terms &amp; Policies</a>
						</div>
						<div className="mt-1">
							<a href="/delete-account" className="text-primary-600 hover:underline">Delete Account</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}


