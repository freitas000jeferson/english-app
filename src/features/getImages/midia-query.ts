import type { Word } from '@prisma/client';
import { prismaDB as prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';
import { decideMedia } from '@/utils/detectAbstractWords';
import { fetchGif } from './fetch-gif';
import { fetchImage } from './fetch-image';

export async function processMediaQueue(limit = 10) {
	const words = await prisma.word.findMany({
		where: {
			OR: [{ imageTried: false }, { gifTried: false }],
		},
		take: limit,
	});

	for (const word of words) {
		await updateWordMidia(word);
	}
}

async function updateWordMidia(word: Word) {
	const decision = decideMedia(word);

	if (decision.image && !word.imageTried) {
		await rateLimit();
		const imageUrl = await fetchImage(word.en);

		await prisma.word.update({
			where: { id: word.id },
			data: {
				imageUrl,
				imageTried: true,
			},
		});
	}

	if (decision.gif && !word.gifTried) {
		await rateLimit();
		const gifUrl = await fetchGif(word.en);

		await prisma.word.update({
			where: { id: word.id },
			data: {
				gifUrl,
				gifTried: true,
			},
		});
	}
}
