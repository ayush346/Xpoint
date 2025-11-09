let isWaveSetup = false;

export function setupGlobalWave() {
	if (isWaveSetup) return;
	isWaveSetup = true;

	function onClick(e) {
		const trigger = e.target?.closest?.("a,button");
		if (!trigger) return;
		const classList = trigger.classList || {};
		const isButton = classList.contains("btn-primary") || classList.contains("btn-secondary") || classList.contains("btn");
		if (!isButton) return;

		const x = e.clientX;
		const y = e.clientY;
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const dx = Math.max(x, vw - x);
		const dy = Math.max(y, vh - y);
		const radius = Math.sqrt(dx * dx + dy * dy);

		const ripple = document.createElement("span");
		ripple.className = "wave-ripple";
		ripple.style.width = `${radius * 2}px`;
		ripple.style.height = `${radius * 2}px`;
		ripple.style.left = `${x - radius}px`;
		ripple.style.top = `${y - radius}px`;

		document.body.appendChild(ripple);

		const remove = () => {
			ripple.removeEventListener("animationend", remove);
			if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
		};
		ripple.addEventListener("animationend", remove);

		// Fallback removal
		setTimeout(remove, 1200);
	}

	// Use capture so clicks are caught before route changes, etc.
	document.addEventListener("click", onClick, true);
}



