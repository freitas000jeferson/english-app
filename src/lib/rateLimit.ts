let lastCall = 0;

export async function rateLimit(ms = 1200) {
	const now = Date.now();
	const diff = now - lastCall;

	if (diff < ms) {
		await new Promise((r) => setTimeout(r, ms - diff));
	}

	lastCall = Date.now();
}
