export async function lookupDictionary(word: string) {
	const [data] = await fetchDictionary(word);

	return {
		word: data.word,
		phonetic: data.phonetic,
		audio: data.phonetics?.filter((p) => p?.audio?.length > 0),
		meanings: data.meanings,
	};
}

export async function fetchDictionary(word: string) {
	const res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		{ next: { revalidate: 60 * 60 * 24 } }, // cache 24h
	);

	if (!res.ok) return null;

	const data = await res.json();
	return data;
}
