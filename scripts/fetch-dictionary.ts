export async function fetchDictionary(word: string) {
	const res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		{ next: { revalidate: 60 * 60 * 24 } }, // cache 24h
	);

	if (!res.ok) return null;

	const data = await res.json();
	return data;
}
