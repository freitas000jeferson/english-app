const ABSTRACT_WORDS = [
	'love',
	'hate',
	'fear',
	'hope',
	'joy',
	'sadness',
	'anger',
	'happiness',
	'thought',
	'belief',
	'idea',
	'memory',
	'dream',
	'knowledge',
	'wisdom',
	'justice',
	'freedom',
	'honesty',
	'respect',
	'responsibility',
	'ethics',
	'time',
	'future',
	'past',
	'existence',
	'life',
	'death',
	'change',
	'culture',
	'society',
	'power',
	'authority',
	'peace',
	'conflict',
	'theory',
	'concept',
	'logic',
	'reason',
	'meaning',
	'system',
	'success',
	'failure',
	'effort',
	'progress',
	'value',
	'purpose',
	'strength',
	'beauty',
	'complexity',
	'simplicity',
	'identity',
	'mind',
	'soul',
	'infinity',
];

export function detectAbstract(word: string, dictionary: any): boolean {
	// 1️⃣ Lista fixa
	if (ABSTRACT_WORDS.includes(word)) return true;

	const meanings = dictionary?.[0]?.meanings ?? [];

	// 2️⃣ Procura substantivo
	const noun = meanings.find((m: any) => m.partOfSpeech === 'noun');

	if (!noun) return false;

	// 3️⃣ Analisa definição
	return noun.definitions.every((d: any) =>
		/(state|quality|idea|concept|feeling)/i.test(d.definition),
	);
}

export function decideMedia({
	isAbstract,
	partOfSpeech,
}: {
	isAbstract: boolean;
	partOfSpeech?: string | null;
}) {
	if (isAbstract) {
		return { image: false, gif: false };
	}

	if (partOfSpeech === 'verb') {
		return { image: false, gif: true };
	}

	if (partOfSpeech === 'noun') {
		return { image: true, gif: false };
	}

	// fallback (adjetivo, advérbio, etc)
	return { image: true, gif: true };
}
