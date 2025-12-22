import { motion } from "framer-motion";

export default function Section({ index, heading, body, renderLegal = false, renderLegalHeadings = false, justify = false, immediate = false }) {
	const transition = { duration: 0.4, delay: Math.min(index * 0.05, 0.3) };
	return (
		<motion.article
			initial={{ opacity: 0, y: 12 }}
			{...(immediate ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } })}
			transition={transition}
			className={`card p-6 md:p-8 ${justify ? "prose-justify" : ""}`}
		>
			<h3 className="text-xl md:text-2xl font-bold text-midnight">
				{heading}
			</h3>
			{renderLegalHeadings ? (
				<div className="mt-3 space-y-3 leading-relaxed">
					{String(body)
						.split("\n\n")
						.map((paragraph, i) => {
							const isSubheading = /^\d+\)\s+/.test(paragraph.trim());
							if (isSubheading) {
								const [firstLine, ...restLines] = paragraph.split("\n");
								return (
									<div key={i} className="space-y-2">
										<div className="font-bold text-midnight">{firstLine}</div>
										{restLines.length > 0 ? (
											<p className={`whitespace-pre-wrap leading-relaxed ${renderLegal ? "text-midnight" : "text-midnight/80"}`}>
												{restLines.join("\n")}
											</p>
										) : null}
									</div>
								);
							}
							return (
								<p key={i} className={`whitespace-pre-wrap ${renderLegal ? "text-midnight" : "text-midnight/80"}`}>
									{paragraph}
								</p>
							);
						})}
				</div>
			) : (
				<p className={`mt-3 whitespace-pre-wrap leading-relaxed ${renderLegal ? "text-midnight" : "text-midnight/80"}`}>
					{body}
				</p>
			)}
		</motion.article>
	);
}






