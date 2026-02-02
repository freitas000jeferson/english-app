const UNSPLASH_KEY = process.env.UNSPLASH_ID!;

export async function fetchImage(word: string) {
	const res = await fetch(
		`https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&per_page=1`,
		{
			headers: {
				Authorization: `Client-ID ${UNSPLASH_KEY}`,
			},
		},
	);

	if (!res.ok) return null;

	const data = await res.json();
	return data.results?.[0]?.urls?.regular ?? null;
}

export async function fallbackImage(word: string) {
	const queries = [word, `${word} verb`, `${word} action`];

	for (const q of queries) {
		const image = await fetchImage(q);
		if (image) return image;
	}
}
