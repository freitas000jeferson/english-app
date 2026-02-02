const CONTRACTIONS: Record<string, string> = {
	"i'm": 'i am',
	"you're": 'you are',
	"he's": 'he is',
	"she's": 'she is',
	"it's": 'it is',
	"we're": 'we are',
	"they're": 'they are',
	"can't": 'cannot',
	'can not': 'cannot',
	"won't": 'will not',
	"don't": 'do not',
	"doesn't": 'does not',
	"didn't": 'did not',
};

const STOP_WORDS = ['a', 'an', 'the'];

export function normalize(text: string) {
	let t = text.toLowerCase();

	Object.entries(CONTRACTIONS).forEach(([k, v]) => {
		t = t.replaceAll(k, v);
	});

	return t
		.replace(/[.,!?]/g, '')
		.split(' ')
		.filter((word) => !STOP_WORDS.includes(word))
		.join(' ');
}
