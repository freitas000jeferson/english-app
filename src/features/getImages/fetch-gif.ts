const GIPHY_KEY = process.env.GIPHY_KEY!;
const PIXABAY_KEY = process.env.PIXABAY_KEY;
/**
 * Ideal para:
- Verbos
- Ações
- Expressões
*/
export async function fetchGif(word: string) {
	const res = await fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(
			word,
		)}&limit=1&rating=g&lang=en`,
	);

	if (!res.ok) return null;

	const data = await res.json();
	return data.data?.[0]?.images?.downsized?.url ?? null;
}

export async function fetchGifWithPixabay(word: string) {
	if (!process.env.PIXABAY_KEY) return null;

	const res = await fetch(
		`https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${encodeURIComponent(word)}&per_page=1`,
	);

	if (!res.ok) return null;

	const data = await res.json();
	return data.hits?.[0]?.videos?.small?.url ?? null;
}
