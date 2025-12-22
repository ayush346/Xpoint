export default function PageHeader({ title, subtitle }) {
	return (
		<section className="gradient-hero border-b border-slate-200">
			<div className="container-padded py-10 md:py-14">
				<h1 className="text-3xl md:text-4xl font-black text-midnight">{title}</h1>
				{subtitle ? <p className="mt-2 text-midnight/70">{subtitle}</p> : null}
			</div>
		</section>
	);
}


