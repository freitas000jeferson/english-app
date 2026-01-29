const STOP_WORDS = ['a', 'an', 'the'];

export function normalize(text: string) {
	return text
		.toLowerCase()
		.replace(/[.,!?]/g, '')
		.split(' ')
		.filter((word) => !STOP_WORDS.includes(word))
		.join(' ');
}
