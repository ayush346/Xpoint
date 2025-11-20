export function parseTextToStructuredContent(rawText, fallbackTitle = "Your Website") {
	if (!rawText || typeof rawText !== "string") {
		return {
			title: fallbackTitle,
			sections: [],
		};
	}

	const normalized = rawText.replace(/\r\n/g, "\n").trim();
	if (!normalized) {
		return {
			title: fallbackTitle,
			sections: [],
		};
	}

	// Split by double newlines to infer blocks
	const blocks = normalized.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);
	let title = fallbackTitle;
	let startIdx = 0;

	// If first block is short, treat it as title
	if (blocks.length > 0 && blocks[0].length <= 80) {
		title = blocks[0];
		startIdx = 1;
	}

	const sections = [];
	let sectionCounter = 1;
	for (let i = startIdx; i < blocks.length; i++) {
		const block = blocks[i];
		// Detect heading by checking for a short first line
		const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
		let heading = "";
		let body = "";
		if (lines.length > 1 && lines[0].length <= 80) {
			heading = lines[0];
			body = lines.slice(1).join("\n\n").trim();
		} else {
			heading = `Section ${sectionCounter}`;
			body = block;
			sectionCounter++;
		}

		sections.push({ heading, body });
	}

	// If no sections detected, create one with the entire text
	if (sections.length === 0) {
		sections.push({ heading: "Overview", body: normalized });
	}

	return { title, sections };
}





